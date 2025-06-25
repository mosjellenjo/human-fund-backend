from dotenv import load_dotenv
load_dotenv()

from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings

db = Chroma(persist_directory="chroma_db", embedding_function=OpenAIEmbeddings())
retriever = db.as_retriever(search_type="mmr", search_kwargs={"k": 12})

docs = retriever.get_relevant_documents("Why is Frank's companion wearing a cape?")
for i, doc in enumerate(docs):
    print(f"\n#{i+1}: {doc.metadata.get('source')}")
    print(doc.page_content[:300])
