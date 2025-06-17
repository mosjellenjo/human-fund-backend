from dotenv import load_dotenv
import os
load_dotenv()

from langchain_openai import OpenAIEmbeddings

embeddings = OpenAIEmbeddings()
result = embeddings.embed_query("Hello Seinfeld")
print(f"Vector size: {len(result)}\nSample values: {result[:5]}")