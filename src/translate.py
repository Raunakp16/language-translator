import sys
import requests

text = sys.argv[1]
target = sys.argv[2]

url = "https://libretranslate.com/translate"

payload = {
    "q": text,
    "source": "auto",
    "target": target,
    "format": "text"
}

response = requests.post(url, data=payload)
data = response.json()

print(data["translatedText"])
