from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain_community.vectorstores import Chroma
from langchain_community.document_loaders import TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv
import os
import glob

app = Flask(__name__)
CORS(app, resources={r"/ask": {"origins": ["http://localhost:3000", "https://www.humanfund.no"]}})

load_dotenv()

CHROMA_DIR = "chroma_db"
SCRIPTS_DIR = "seinfeld_scripts"

# Character-specific system prompts
persona_prompts = {
    "jerry": """You are Jerry Seinfeld. You speak with observational wit, are often the voice of reason, and enjoy poking fun at life's absurdities. You answer using short, crisp, dry humor responses.

Use only the provided CONTEXT to answer the QUESTION. If the answer is not in the context, say "I don't know." Do not make anything up.""",
    
    "george": """You are George Costanza. You're neurotic, defensive, and often exaggerate. Answer in a flustered, over-explaining tone, but ONLY use the provided CONTEXT. If the answer isn’t in the context, say "I don't know!" Do not make anything up.""",
    
    "kramer": """You are Cosmo Kramer. You're eccentric, wildly enthusiastic, and unpredictable. Use the CONTEXT below to answer the QUESTION in your quirky, chaotic way. If the answer isn’t in the context, just say “I don’t know, buddy!” Don’t make it up.""",
    
    "kruger": """You are Mr. Kruger. You're laid-back, clueless, and don’t really care. Use the CONTEXT to answer the QUESTION as best you can. If the answer isn’t in the context, say “Eh, no idea.” Never guess."""
}

# Vector DB builder
def rebuild_chroma_db():
    print("🧠 Rebuilding Chroma vector store from scratch...")
    embeddings = OpenAIEmbeddings()
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
    all_docs = []

    for filepath in glob.glob(f"{SCRIPTS_DIR}/*.txt"):
        loader = TextLoader(filepath, encoding='utf-8')
        docs = loader.load_and_split(text_splitter)
        all_docs.extend(docs)

    vectordb = Chroma.from_documents(all_docs, embeddings, persist_directory=CHROMA_DIR)
    vectordb.persist()
    print("✅ Chroma DB rebuilt and saved.")
    return vectordb

# Load or create vector store
if not os.path.exists(CHROMA_DIR) or not os.listdir(CHROMA_DIR):
    vectordb = rebuild_chroma_db()
else:
    embeddings = OpenAIEmbeddings()
    vectordb = Chroma(persist_directory=CHROMA_DIR, embedding_function=embeddings)

retriever = vectordb.as_retriever(search_kwargs={"k": 4})

@app.route("/ask", methods=["POST"])
def ask():
    data = request.json
    query = data.get("question", "")
    persona = data.get("persona", "jerry")

    if not query:
        return jsonify({"error": "No question provided"}), 400

    prompt_text = persona_prompts.get(persona, persona_prompts["jerry"])
    prompt = PromptTemplate.from_template(
        prompt_text.strip() + "\n\nCONTEXT:\n{context}\n\nQUESTION: {question}\n\nANSWER:"
    )

    qa_chain = RetrievalQA.from_chain_type(
        llm=ChatOpenAI(model_name="gpt-4o", temperature=0),
        retriever=retriever,
        return_source_documents=True,
        chain_type="stuff",
        chain_type_kwargs={"prompt": prompt}
    )

    response = qa_chain.invoke({"query": query})
    sources = [os.path.basename(doc.metadata["source"]) for doc in response["source_documents"]]

    return jsonify({
        "answer": response["result"],
        "sources": sources
    })

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
