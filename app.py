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
import requests  # 🔊 For ElevenLabs API
ELEVENLABS_API_KEY = os.getenv("ELEVENLABS_API_KEY")
ELEVENLABS_VOICE_ID = os.getenv("ELEVENLABS_VOICE_ID")  # <- Your Jerry voice ID
# Load environment variables
load_dotenv()

# --- Flask setup ---
app = Flask(__name__)
CORS(app, resources={r"/ask": {"origins": ["http://localhost:3000", "https://www.humanfund.no"]}}, supports_credentials=True)

# --- Prompt templates by persona ---
persona_prompts = {
    "jerry": PromptTemplate(
        input_variables=["context", "question"],
        template="""
You are Jerry Seinfeld. Use the context below to answer the user's question about Seinfeld.
Be witty, observational, and concise — like you're doing stand-up. Only use the context to answer, but if the answer is unclear or incomplete, give a witty guess. Don’t make stuff up.

Context:
{context}

Question: {question}

Answer:"""
    ),
    "george": PromptTemplate(
        input_variables=["context", "question"],
        template="""
You are George Costanza responding to questions using the provided Seinfeld script context below. You’re neurotic, defensive, and always a little agitated — but occasionally insightful.

Answer briefly, and in a panicked, overthinking tone.  
If the answer is unclear or incomplete, make your best guess — while complaining how unfair or confusing everything is.

Context:
{context}

Question:
{question}

Answer:
"""
    ),
    "kramer": PromptTemplate(
        input_variables=["context", "question"],
        template="""
You are Cosmo Kramer responding to questions using the provided Seinfeld script context below. You're full of oddball energy and unexpected ideas.

Keep your answers short, confident, and eccentric.  
If the answer isn't clear, improvise something half-true and bizarre — like you're onto something big.

Context:
{context}

Question:
{question}

Answer:
"""
    ),
    "kruger": PromptTemplate(
        input_variables=["context", "question"],
        template="""
You are Mr. Kruger responding to questions using the provided Seinfeld script context below. You're laid-back, clueless, and slightly out of touch — but you're cool with it.

Answer casually and briefly, even if you're unsure.  
If the answer is unclear, say something vague that sounds like it could be right — or just brush it off.

Context:
{context}

Question:
{question}

Answer:
"""
    )
}


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
            loader = TextLoader(path, encoding="utf-8", autodetect_encoding=False)
            documents.extend(loader.load())

    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1500, chunk_overlap=200)
    texts = text_splitter.split_documents(documents)

    vectorstore = Chroma.from_documents(texts, embeddings, persist_directory=CHROMA_DIR)
    vectorstore.persist()
    print(f"✅ Embedded {len(texts)} chunks from {len(documents)} scripts")
else:
    print("📦 Using existing Chroma DB...")
    vectorstore = Chroma(persist_directory=CHROMA_DIR, embedding_function=embeddings)

# --- Retrieval chain with prompt ---
retriever = vectorstore.as_retriever(search_type="mmr", k=8)

qa_chain = RetrievalQA.from_chain_type(
    llm=ChatOpenAI(temperature=0.3, model="gpt-4o"),
    retriever=retriever,
    chain_type="stuff",
    chain_type_kwargs={"prompt": persona_prompts["jerry"]},
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

def generate_audio_from_text(text):
    try:
        url = f"https://api.elevenlabs.io/v1/text-to-speech/{ELEVENLABS_VOICE_ID}"
        headers = {
            "xi-api-key": ELEVENLABS_API_KEY,
            "Content-Type": "application/json"
        }
        payload = {
            "text": text,
            "model_id": "eleven_multilingual_v2",  # safest default
            "voice_settings": {
                "stability": 0.5,
                "similarity_boost": 0.75
            }
        }
        response = requests.post(url, json=payload, headers=headers)
        if response.status_code == 200:
            return response.content  # binary mp3
        else:
            print(f"🔊 ElevenLabs API error: {response.status_code} {response.text}")
            return None
    except Exception as e:
        print(f"🔊 Audio generation failed: {e}")
        return None


# --- /ask endpoint ---
@app.route("/ask", methods=["POST"])
def ask():
    print("✅ /ask endpoint hit")
    print("🧪 DEBUG: Live backend is running this version of app.py")
    try:
        data = request.get_json()
        question = data.get("question", "").strip()
        history = data.get("history", [])
        formatted_history = "\n".join(history) if history else ""

        if not question:
            return jsonify({"error": "Missing 'question' in request"}), 400

        # ✅ NEW: Log retrieved documents
        custom_get_context_with_scores(question)

        persona = data.get("persona", "jerry").lower()
        prompt = persona_prompts.get(persona, persona_prompts["jerry"])
        custom_qa_chain = RetrievalQA.from_chain_type(
            llm=ChatOpenAI(temperature=0.3, model="gpt-4o"),
            retriever=retriever,
            chain_type="stuff",
            chain_type_kwargs={"prompt": prompt},
            return_source_documents=True,
            input_key="query"
        )
        full_question = f"{formatted_history}\nUser: {question}" if formatted_history else question
        result = custom_qa_chain.invoke({"query": full_question})

        answer = result.get("result") or result.get("answer") or "I don't know."
        sources = list(dict.fromkeys(doc.metadata.get("source", "unknown") for doc in result.get("source_documents", [])))

        print(f"\n📤 Answer: {answer}")
        print(f"📚 Sources: {sources}")

        from base64 import b64encode

        audio_bytes = generate_audio_from_text(answer)
        audio_base64 = b64encode(audio_bytes).decode("utf-8") if audio_bytes else None

        return jsonify({
            "answer": answer,
            "sources": sources,
            "audio": audio_base64
        })


    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

# --- Run app ---
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port, debug=True)

# print("=== Retrieved context ===")
# print(context)