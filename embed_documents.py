from dotenv import load_dotenv
import os
import shutil
from langchain_community.vectorstores import Chroma
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_community.document_loaders import TextLoader
from collections import Counter

# Load environment variables
load_dotenv()

# Paths
SCRIPT_FOLDER = "seinfeld_scripts"
CHROMA_DB_FOLDER = "chroma_db"

# ⚠️ Force delete previous DB
if os.path.exists(CHROMA_DB_FOLDER):
    print(f"🗑️ Removing old vector store at {CHROMA_DB_FOLDER}...")
    shutil.rmtree(CHROMA_DB_FOLDER)

# Step 1: Load all documents
print("🔄 Loading Seinfeld scripts...")
documents = []
for filename in os.listdir(SCRIPT_FOLDER):
    if filename.endswith(".txt"):
        path = os.path.join(SCRIPT_FOLDER, filename)
        loader = TextLoader(path, encoding="utf-8")
        docs = loader.load()
        for doc in docs:
            doc.metadata["source"] = filename
            doc.metadata["title"] = filename.replace(".txt", "")  # ✅ added for possible improved ranking
            documents.append(doc)

print(f"📄 Loaded {len(documents)} files")

# Step 2: Split into chunks
print("✂️ Splitting into smaller chunks (200 chars each)...")
splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=150,
    separators=["\n\n", "\n", ".", "!", "?", " ", ""],
)
splits = splitter.split_documents(documents)
print(f"🧩 Total chunks created: {len(splits)}")

# Count how many chunks per file
print("\n📊 Chunks per source:")
counts = Counter(doc.metadata["source"] for doc in splits)
for file, count in counts.items():
    print(f"• {file}: {count} chunks")

# Step 3: Preview from The_Strike.txt
print("\n📦 Preview of chunks from The_Strike.txt:")
for doc in splits:
    if "strike" in doc.metadata["source"].lower():
        print(doc.page_content[:300].replace("\n", " "))
        print("—" * 40)

# Step 4: Embed and save
print("\n🧠 Embedding and saving to Chroma...")
embedding = OpenAIEmbeddings()
Chroma.from_documents(
    documents=splits,
    embedding=embedding,
    persist_directory=CHROMA_DB_FOLDER,
)

print("\n✅ Vector store successfully rebuilt and saved.")
