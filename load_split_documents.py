from langchain_community.document_loaders import TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
import os

# Step 1: Load all .txt files from the seinfeld_scripts folder
folder_path = "./seinfeld_scripts"
loaders = []

for filename in os.listdir(folder_path):
    if filename.endswith(".txt"):
        file_path = os.path.join(folder_path, filename)
        loaders.append(TextLoader(file_path, encoding='utf-8'))

# Load documents
docs = []
for loader in loaders:
    docs.extend(loader.load())

print(f"Loaded {len(docs)} documents.")

# Step 2: Split documents into chunks
splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=300,
    separators=["\n\n", "\n", ".", "!", "?", " ", ""]
)

splits = splitter.split_documents(docs)
print(f"Created {len(splits)} document chunks.")