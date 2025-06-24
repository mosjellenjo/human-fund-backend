import os
import chardet

SCRIPT_DIR = "seinfeld_scripts"

for filename in os.listdir(SCRIPT_DIR):
    if filename.endswith(".txt"):
        path = os.path.join(SCRIPT_DIR, filename)
        with open(path, 'rb') as f:
            result = chardet.detect(f.read())
            print(f"{filename}: {result['encoding']} (confidence {round(result['confidence']*100)}%)")
