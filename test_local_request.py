import requests
import json

def test_rag_backend():
    url = "http://localhost:10000/ask"
    payload = {
        "question": "What were Kramer's demands when he went on strike, and what did he end up getting?"
    }

    try:
        response = requests.post(url, json=payload)
        print("Status Code:", response.status_code)
        print("Raw Text Response:\n", response.text)

        data = response.json()
        print("Parsed JSON Response:", json.dumps(data, indent=2))
    except json.JSONDecodeError as e:
        print("❌ Failed to decode JSON:", e)
    except Exception as e:
        print("❌ Request failed:", e)

if __name__ == "__main__":
    test_rag_backend()
