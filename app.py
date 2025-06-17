from flask_cors import CORS
from flask import Flask, request, jsonify
from langchain_community.vectorstores import Chroma
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain.chains import RetrievalQA
from dotenv import load_dotenv
import os

app = Flask(__name__)
CORS(app, resources={r"/ask": {"origins": "http://localhost:3000"}})
load_dotenv()

# Initialize embeddings + vector store
embeddings = OpenAIEmbeddings()
vectordb = Chroma(persist_directory="chroma_db", embedding_function=embeddings)
retriever = vectordb.as_retriever(search_kwargs={"k": 4})

# Create ChatGPT LLM with guardrails
llm = ChatOpenAI(
    model_name="gpt-4o",
    temperature=0,
)

qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=retriever,
    return_source_documents=True
)

@app.route("/ask", methods=["POST"])
def ask():
    data = request.json
    query = data.get("question", "")
    if not query:
        return jsonify({"error": "No question provided"}), 400

    response = qa_chain.invoke({"query": query})
    sources = [os.path.basename(doc.metadata["source"]) for doc in response["source_documents"]]

    return jsonify({
        "answer": response["result"],
        "sources": sources
    })

if __name__ == "__main__":
    app.run(debug=True)
