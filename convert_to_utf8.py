import os

files_to_fix = ["The_Secretary.txt", "The_Soup.txt"]
SCRIPT_DIR = "seinfeld_scripts"

for file in files_to_fix:
    path = os.path.join(SCRIPT_DIR, file)
    try:
        with open(path, 'rb') as f:
            raw_bytes = f.read()

        # Decode ignoring problematic bytes
        decoded = raw_bytes.decode('utf-8', errors='replace')

        # Re-write clean UTF-8
        with open(path, 'w', encoding='utf-8') as f:
            f.write(decoded)

        print(f"✅ Cleaned and re-saved {file}")
    except Exception as e:
        print(f"❌ Still failed: {file} — {e}")
