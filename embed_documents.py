from dotenv import load_dotenv
import os
from langchain_community.vectorstores import Chroma
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_community.document_loaders import DirectoryLoader, TextLoader

# Load your API key from .env
load_dotenv()

# Load and split documents
loader = DirectoryLoader(
    "seinfeld_scripts",
    glob="*.txt",
    loader_cls=lambda path: TextLoader(path, encoding="utf-8")
)
docs = loader.load()

splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200,
    separators=["\n\n", "\n", ".", "!", "?", " ", ""]
)
splits = splitter.split_documents(docs)

# Embed and store in Chroma
embedding = OpenAIEmbeddings()
vectorstore = Chroma.from_documents(
    documents=splits,
    embedding=embedding,
    persist_directory="chroma_db"
)

print(f"✅ Embedded {len(splits)} chunks and saved to vectorstore.")