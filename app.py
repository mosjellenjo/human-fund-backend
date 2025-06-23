from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain_community.vectorstores import Chroma
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain.prompts import PromptTemplate
from langchain.chains import RetrievalQA
from langchain_community.document_loaders import TextLoader
from langchain.schema import Document  # ✅ NEW

from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# --- Flask setup ---
app = Flask(__name__)
CORS(app, resources={r"/ask": {"origins": ["http://localhost:3000", "https://www.humanfund.no"]}})

# --- Prompt template ---
prompt_template = PromptTemplate(
    input_variables=["context", "question"],
    template="""
You are Jerry Seinfeld. Use the context below to answer the user's question about Seinfeld.
Be concise, witty, and reference the episode where possible. If you don’t know the answer, just say “I don’t know.”

Context:
{context}

Question: {question}

Answer:"""
)

# --- Constants ---
CHROMA_DIR = "./chroma_db"
SCRIPT_DIR = "seinfeld_scripts"

# --- Embeddings and Vector Store ---
embeddings = OpenAIEmbeddings()

# Load or create Chroma vector DB
if not os.path.exists(CHROMA_DIR):
    print("📄 Embedding Seinfeld scripts...")
    documents = []
    for filename in os.listdir(SCRIPT_DIR):
        if filename.endswith(".txt"):
            path = os.path.join(SCRIPT_DIR, filename)
            loader = TextLoader(path)
            documents.extend(loader.load())

    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
    texts = text_splitter.split_documents(documents)

    vectorstore = Chroma.from_documents(texts, embeddings, persist_directory=CHROMA_DIR)
    vectorstore.persist()
    print(f"✅ Embedded {len(texts)} chunks from {len(documents)} scripts")
else:
    print("📦 Using existing Chroma DB...")
    vectorstore = Chroma(persist_directory=CHROMA_DIR, embedding_function=embeddings)

# --- Retrieval chain with prompt ---
retriever = vectorstore.as_retriever(search_type="similarity", k=1)

qa_chain = RetrievalQA.from_chain_type(
    llm=ChatOpenAI(temperature=0.2, model="gpt-4o"),
    retriever=retriever,
    chain_type="stuff",
    chain_type_kwargs={"prompt": prompt_template},
    return_source_documents=True
)

# ✅ NEW: Log which docs are retrieved for a question
def custom_get_context_with_scores(query):
    print(f"\n🔎 Retrieving docs for query: '{query}'")

    docs: list[Document] = retriever.get_relevant_documents(query)
    for i, doc in enumerate(docs):
        source = doc.metadata.get("source", "unknown")
        preview = doc.page_content[:180].replace("\n", " ")
        print(f"\n#{i+1}: {source}")
        print(f"{preview}")
        print("-" * 40)

    return docs

# --- /ask endpoint ---
@app.route("/ask", methods=["POST"])
def ask():
    print("✅ /ask endpoint hit")
    try:
        data = request.get_json()
        question = data.get("question", "").strip()

        if not question:
            return jsonify({"error": "Missing 'question' in request"}), 400

        # ✅ NEW: Log retrieved documents
        custom_get_context_with_scores(question)

        result = qa_chain.invoke({"query": question})

        answer = result.get("result", "I don't know.")
        sources = list(dict.fromkeys(doc.metadata.get("source", "unknown") for doc in result.get("source_documents", [])))

        print(f"\n📤 Answer: {answer}")
        print(f"📚 Sources: {sources}")

        return jsonify({
            "answer": answer,
            "sources": [sources[0]] if sources else []
        })

    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

# --- Run app ---
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port, debug=True)
