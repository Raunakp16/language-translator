import sys
import json
from googletrans import Translator

def perform_local_translation(text, target):
    try:
        translator = Translator()
        translation = translator.translate(text, src='auto', dest=target)

        # Output JSON for Node.js
        print(json.dumps({
            "success": True,
            "translated_text": translation.text
        }))

    except Exception as e:
        print(json.dumps({
            "success": False,
            "error_message": f"Google Translate Error: {str(e)}"
        }))
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) > 2:
        text_to_translate = sys.argv[1]
        target_language = sys.argv[2]
        perform_local_translation(text_to_translate, target_language)
    else:
        print(json.dumps({"success": False, "error_message": "Missing text or target language arguments."}))
        sys.exit(1)
