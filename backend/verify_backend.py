import requests
import time
import sys

BASE_URL = "http://127.0.0.1:8000"

def test_api():
    print("Waiting for API to start...")
    for _ in range(10):
        try:
            requests.get(BASE_URL)
            break
        except requests.exceptions.ConnectionError:
            time.sleep(1)
    else:
        print("API failed to start.")
        sys.exit(1)

    print("API is up. Testing Knowledge Update...")
    knowledge_text = """
    Le Défi National Nuit de l'Info 2025 est une compétition de programmation.
    Elle se déroule du 4 décembre au 5 décembre.
    Les organisateurs sont joignables à contact@nuitinfo.com.
    """
    
    resp = requests.post(f"{BASE_URL}/api/knowledge", json={"text": knowledge_text})
    assert resp.status_code == 200
    print("Knowledge Update: OK")
    print(resp.json())

    print("\nTesting Chat (French)...")
    resp = requests.post(f"{BASE_URL}/api/chat", json={"message": "Quand est la compétition ?"})
    assert resp.status_code == 200
    data = resp.json()
    print("Answer:", data["answer"])
    assert "2025" in data["answer"]
    print("Chat (French): OK")

    print("\nTesting Chat (Hassaniya)...")
    # "mata" = quand, "l7adath" = l'événement (mapped to competition/event context)
    resp = requests.post(f"{BASE_URL}/api/chat", json={"message": "mata yabda le défi ?"})
    assert resp.status_code == 200
    data = resp.json()
    print("Answer:", data["answer"])
    # Expecting the same answer because "mata yabda le défi" -> "quand commence le défi" -> matches "défi" and "commence" (or context)
    # My simple TF-IDF might be a bit fuzzy, but let's see.
    # "yabda" -> "commence". "le défi" -> "le défi".
    # Knowledge has "Le Défi National...".
    assert "2025" in data["answer"]
    print("Chat (Hassaniya): OK")

if __name__ == "__main__":
    test_api()
