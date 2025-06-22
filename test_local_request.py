import requests

response = requests.post(
    "http://127.0.0.1:5000/ask",
    json={
        "question": "What were Kramer's demands during the strike?",
        "persona": "jerry"
    }
)

print(response.json())
