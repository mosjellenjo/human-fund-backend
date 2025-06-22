from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings
import os
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

# Path to the Chroma DB directory
PERSIST_DIRECTORY = os.path.join(os.getcwd(), "chroma_db")

# Initialize the embedding model
embedding = OpenAIEmbeddings()

# Reconnect to the Chroma vector store
print("🔍 Connecting to Chroma...")
db = Chroma(persist_directory=PERSIST_DIRECTORY, embedding_function=embedding)

# Fetch documents
collection = db.get()
documents = collection.get("documents", [])

# Output result
if documents:
    print(f"✅ Vector store loaded successfully with {len(documents)} documents.")
    print("🔹 Example document:\n", documents[0])
else:
    print("⚠️ No documents found in vector store.")
