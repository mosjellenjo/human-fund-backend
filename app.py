from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain_community.vectorstores import Chroma
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv
import os

# Load environment variables from .env
load_dotenv()

# --- Flask setup ---
app = Flask(__name__)
CORS(app, resources={r"/ask": {"origins": ["http://localhost:3000", "https://www.humanfund.no"]}})

# --- Constants ---
CHROMA_DIR = "./chroma_db"

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

# --- Load Chroma vector store ---
embeddings = OpenAIEmbeddings()
vectorstore = Chroma(
    persist_directory=CHROMA_DIR,
    embedding_function=embeddings
)

# --- Setup GPT-4o with RetrievalQA chain ---
llm = ChatOpenAI(temperature=0.2, model="gpt-4o")

qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=vectorstore.as_retriever(search_type="similarity", k=5),
    chain_type="stuff",
    chain_type_kwargs={"prompt": prompt_template},
    return_source_documents=True
)

# --- Flask route ---
@app.route("/ask", methods=["POST"])
def ask():
    try:
        data = request.get_json()
        question = data.get("question", "").strip()

        if not question:
            return jsonify({"error": "Missing 'question' in request"}), 400

        # Use correct key for qa_chain input
        result = qa_chain.invoke({"query": question})

        answer = result.get("result", "I don't know.")
        sources = [doc.metadata.get("source", "unknown") for doc in result.get("source_documents", [])]

        return jsonify({
            "answer": answer,
            "sources": list(set(sources))  # deduplicate
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
