import os
import openai
import chromadb
# from dotenv import load_dotenv # Commented out as we're handling it manually
import time
from chromadb.utils import embedding_functions # Import embedding functions

# Manually load OPENAI_API_KEY from .env.local
try:
    with open(".env.local", "r") as f:
        for line in f:
            line = line.strip()
            if line.startswith("OPENAI_API_KEY="):
                os.environ["OPENAI_API_KEY"] = line.split("=", 1)[1]
                break
except FileNotFoundError:
    print("Error: .env.local file not found. Please create it in the root directory.")
except Exception as e:
    print(f"Error loading .env.local: {e}")

# Diagnostic: Print the API key value (for debugging only)
print(f"OPENAI_API_KEY loaded in script: {os.getenv("OPENAI_API_KEY")}")

# Initialize OpenAI client
# Ensure OPENAI_API_KEY is set in your .env.local or environment variables
openai_client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Configuration
SCRIPTS_DIR = "seinfeld_scripts"
# CHROMA_DB_PATH = "chroma_db" # No longer needed for HTTP client
COLLECTION_NAME = "seinfeld_scripts_collection"
EMBEDDING_MODEL = "text-embedding-ada-002"
CHUNK_SIZE = 1000  # Characters per chunk
CHUNK_OVERLAP = 200 # Overlap between chunks to preserve context

def get_chunks(text, chunk_size, chunk_overlap):
    """Splits text into overlapping chunks."""
    chunks = []
    start = 0
    while start < len(text):
        end = start + chunk_size
        chunks.append(text[start:end])
        start += chunk_size - chunk_overlap
    return chunks

def generate_embeddings(text_chunks):
    """Generates embeddings for a list of text chunks using OpenAI."""
    embeddings = []
    if not openai_client.api_key:
        print("Error: OPENAI_API_KEY not found. Please set it in your .env.local file.")
        return []

    for i, chunk in enumerate(text_chunks):
        try:
            response = openai_client.embeddings.create(
                input=[chunk],
                model=EMBEDDING_MODEL
            )
            embeddings.append(response.data[0].embedding)
            print(f"Generated embedding for chunk {i+1}/{len(text_chunks)}")
            time.sleep(0.02) # Small delay to avoid hitting rate limits
        except openai.APIError as e:
            print(f"Error generating embedding for chunk {i+1}: {e}")
            # Depending on the error, you might want to retry or skip
            continue
    return embeddings

def prepare_and_store_data():
    """Reads scripts, chunks them, generates embeddings, and stores in ChromaDB."""
    # Connect to the running ChromaDB Docker container
    chroma_client = chromadb.HttpClient(host="localhost", port=8000)

    # Initialize OpenAI embedding function for ChromaDB
    print(f"API Key being used for OpenAIEmbeddingFunction: {os.getenv("OPENAI_API_KEY")}") # Diagnostic print
    openai_ef = embedding_functions.OpenAIEmbeddingFunction(
        api_key=os.getenv("OPENAI_API_KEY"), # Pass API key from environment
        model_name=EMBEDDING_MODEL
    )

    # Delete the collection if it already exists to ensure it's recreated with the correct embedding function
    try:
        chroma_client.delete_collection(name=COLLECTION_NAME)
        print(f"Existing collection '{COLLECTION_NAME}' deleted.")
    except Exception as e:
        print(f"Collection '{COLLECTION_NAME}' not found or could not be deleted: {e}")

    # Get or create the collection with the OpenAI embedding function
    try:
        collection = chroma_client.get_or_create_collection(
            name=COLLECTION_NAME,
            embedding_function=openai_ef # Pass the embedding function here
        )
        print(f"ChromaDB collection '{COLLECTION_NAME}' ready with OpenAI embedding function.")
    except Exception as e:
        print(f"Error connecting to ChromaDB or creating collection: {e}")
        return

    # Always proceed with embedding and adding data for the server setup
    # For now, we'll just add new data, duplicates might occur if not cleared manually.
    # collection.delete(ids=collection.get_all_ids()) # Uncomment to clear collection before adding

    documents = []
    metadatas = []
    ids = []
    chunk_counter = 0

    print(f"Starting to process scripts from '{SCRIPTS_DIR}'...")
    for filename in os.listdir(SCRIPTS_DIR):
        if filename.endswith(".txt"):
            filepath = os.path.join(SCRIPTS_DIR, filename)
            with open(filepath, 'r', encoding='utf-8') as f:
                script_content = f.read()

            episode_title = os.path.splitext(filename)[0].replace('_', ' ')
            
            chunks = get_chunks(script_content, CHUNK_SIZE, CHUNK_OVERLAP)

            print(f"Processing '{filename}' ({len(chunks)} chunks)...")
            for i, chunk in enumerate(chunks):
                documents.append(chunk)
                metadatas.append({"episode_title": episode_title, "source_file": filename, "chunk_id": i})
                ids.append(f"doc_{chunk_counter}")
                chunk_counter += 1
    
    print(f"Total chunks prepared: {len(documents)}")

    # Generate embeddings for all documents
    all_embeddings = generate_embeddings(documents)

    if not all_embeddings:
        print("No embeddings generated. Exiting.")
        return

    # Add to ChromaDB in batches
    BATCH_SIZE = 500 # Define a smaller batch size for ChromaDB
    for i in range(0, len(documents), BATCH_SIZE):
        batch_documents = documents[i:i + BATCH_SIZE]
        batch_embeddings = all_embeddings[i:i + BATCH_SIZE]
        batch_metadatas = metadatas[i:i + BATCH_SIZE]
        batch_ids = ids[i:i + BATCH_SIZE]
        try:
            collection.add(
                    documents=batch_documents,
                    embeddings=batch_embeddings,
                    metadatas=batch_metadatas,
                    ids=batch_ids
            )
            print(f"Successfully added batch {i//BATCH_SIZE + 1} to ChromaDB. Total added: {i + len(batch_documents)}")
        except Exception as e:
            print(f"Error adding batch {i//BATCH_SIZE + 1} to ChromaDB: {e}")

    print(f"Finished adding all {len(documents)} documents to ChromaDB collection '{COLLECTION_NAME}'.")

if __name__ == "__main__":
    prepare_and_store_data()
