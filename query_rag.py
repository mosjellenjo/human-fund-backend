from langchain_chroma import Chroma
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain.chains import RetrievalQA
from langchain.prompts import ChatPromptTemplate
from dotenv import load_dotenv
import os

# Load environment variables (OpenAI key, etc.)
load_dotenv()

# Step 1: Set up embedding and vector store
embeddings = OpenAIEmbeddings()
vectordb = Chroma(persist_directory="chroma_db", embedding_function=embeddings)
retriever = vectordb.as_retriever(search_kwargs={"k": 2})

# Step 2: Create a prompt with both {context} and {question}
prompt = ChatPromptTemplate.from_template("""
You are KrugerGPT, a helpful assistant who only answers using the provided context.
If the answer is not in the context, say "I don't know".

Context:
{context}

Question:
{question}
""")

# Step 3: Initialize the LLM
llm = ChatOpenAI(
    model_name="gpt-4o",
    temperature=0,
    top_p=1,
    frequency_penalty=0,
    presence_penalty=0
)

# Step 4: Build the RetrievalQA chain
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=retriever,
    return_source_documents=True,
    chain_type="stuff",
    chain_type_kwargs={"prompt": prompt}
)

# Step 5: Ask the user and run query
query = input("Ask KrugerGPT a question about Seinfeld: ")
response = qa_chain.invoke({"query": query})

# Step 6: Display result
print("\n🧠 Answer:\n", response["result"])
print("\n📁 Sources:")
for doc in response["source_documents"]:
    print("-", os.path.basename(doc.metadata["source"]))
