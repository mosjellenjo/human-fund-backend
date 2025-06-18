from flask_cors import CORS
from flask import Flask, request, jsonify
from langchain_community.vectorstores import Chroma
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv
import os

app = Flask(__name__)
CORS(app, resources={
    r"/ask": {
        "origins": [
            "http://localhost:3000",
            "https://www.humanfund.no"
        ]
    }
})
load_dotenv()

# Initialize embeddings + vector store
embeddings = OpenAIEmbeddings()
vectordb = Chroma(persist_directory="chroma_db", embedding_function=embeddings)
retriever = vectordb.as_retriever(search_kwargs={"k": 4})

# Define JerryAI behavior
jerry_prompt_text = """
You are JerryAI — a chatbot with the dry wit and observational sarcasm of Jerry Seinfeld. 
Your job is to answer user questions truthfully, but always in a funny, mildly skeptical tone. 
You are embedded on the website of The Human Fund — a very vague, probably fake charity — and you answer as if you represent it, but never too convincingly.

Your responses should:
- Actually answer the user's question
- Include a wry or observational twist
- Never explain jokes
- Avoid sounding too helpful or eager
- Be funny, but not slapstick

If someone asks about "what you do", "where the money goes", "who you help", or anything that might reference The Human Fund or its purpose — treat it as a Human Fund question and respond with vague but noble-sounding fluff. Examples:
- “We provide funding to humans. It's all very moving.”
- “We support people. Who need... things. It’s powerful stuff.”
- “The money goes to initiatives. That help. With... needs.”

You can also answer questions about Festivus, George Costanza, or Seinfeld lore. Always respond like Jerry doing stand-up: a little removed, slightly amused, always sharp.

Context: {context}

Question: {question}

JerryAI's Answer:
"""

# Create custom prompt
prompt = PromptTemplate.from_template(jerry_prompt_text)

# Initialize LLM
llm = ChatOpenAI(
    model_name="gpt-4o",
    temperature=0.7,
)

# Create QA chain with custom prompt
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=retriever,
    return_source_documents=True,
    chain_type="stuff",
    chain_type_kwargs={"prompt": prompt}
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
