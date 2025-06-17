import chromadb
import os
from chromadb.utils import embedding_functions
import openai

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

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

if not OPENAI_API_KEY:
    print("OPENAI_API_KEY not set. Please set it in your .env.local file or environment variables.")
    exit()

# Connect to the running ChromaDB Docker container
chroma_client = chromadb.HttpClient(host="localhost", port=8000)

COLLECTION_NAME = "seinfeld_scripts_collection"
EMBEDDING_MODEL = "text-embedding-ada-002"

def verify_chroma_collection():
    try:
        collection = chroma_client.get_collection(name=COLLECTION_NAME)
        print(f"Successfully connected to collection '{COLLECTION_NAME}'.")

        count = collection.count()
        print(f"Collection '{COLLECTION_NAME}' contains {count} items.")

        if count > 0:
            print("Attempting a test query without explicit embedding function for query (should ideally work if EF is set on collection server-side)...")
            try:
                results_no_ef = collection.query(
                    query_texts=["Who is Newman?"],
                    n_results=2
                )
                print("Test query results (no explicit EF):")
                print(results_no_ef)
            except Exception as e:
                print(f"Error during query without explicit EF: {e}")
                print("This confirms the server-side embedding function is not being used for queries.")
            
            print("\nAttempting a test query with explicit embedding function...")
            openai_ef = embedding_functions.OpenAIEmbeddingFunction(
                api_key=OPENAI_API_KEY,
                model_name=EMBEDDING_MODEL
            )
            results_with_ef = collection.query(
                query_texts=["Who is Newman?"],
                n_results=2,
                query_embedding_function=openai_ef # Explicitly pass EF for query
            )
            print("Test query results (with explicit EF):")
            print(results_with_ef)

        else:
            print("Collection is empty. Data needs to be re-added.")

    except Exception as e:
        print(f"Error verifying ChromaDB collection: {e}")
        print("This might indicate the collection does not exist or there's a connection issue or a critical server error.")

if __name__ == "__main__":
    verify_chroma_collection() 