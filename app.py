from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain_community.vectorstores import Chroma
from langchain_community.document_loaders import TextLoader
from langchain_community.embeddings import OpenAIEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains import RetrievalQA
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv
import os
import glob

# Load environment variables
load_dotenv()

# Flask app setup
app = Flask(__name__)
CORS(app, resources={r"/ask": {"origins": ["http://localhost:3000", "https://www.humanfund.no"]}})

# Paths
SCRIPT_DIR = "seinfeld_scripts"
CHROMA_DIR = "chroma_db"

# Load and embed documents into Chroma vector store
def load_or_build_vectorstore():
    if not os.path.exists(CHROMA_DIR) or not os.listdir(CHROMA_DIR):
        print("🔄 Rebuilding Chroma DB from Seinfeld scripts...")
        loader = TextLoader.from_files(glob.glob(f"{SCRIPT_DIR}/*.txt"), encoding="utf8")
        documents = loader.load()
        splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
        split_docs = splitter.split_documents(documents)
        embeddings = OpenAIEmbeddings()
        return Chroma.from_documents(split_docs, embeddings, persist_directory=CHROMA_DIR)
    else:
        print("✅ Loading existing Chroma DB...")
        embeddings = OpenAIEmbeddings()
        return Chroma(persist_directory=CHROMA_DIR, embedding_function=embeddings)

# Initialize retriever chain
vectorstore = load_or_build_vectorstore()
retriever = vectorstore.as_retriever(search_type="similarity", search_kwargs={"k": 4})

qa_chain = RetrievalQA.from_chain_type(
    llm=ChatOpenAI(model="gpt-4o", temperature=0.7),
    retriever=retriever,
    return_source_documents=True,
    chain_type="stuff"
)

# Flask route
@app.route("/ask", methods=["POST"])
def ask():
    data = request.json
    question = data.get("question", "")

    if not question:
        return jsonify({"error": "No question provided"}), 400

    result = qa_chain(question)
    answer = result["result"]
    sources = list(set(doc.metadata.get("source", "unknown") for doc in result["source_documents"]))

    return jsonify({
        "answer": answer.strip(),
        "sources": sources
    })

# For Render deployment
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
