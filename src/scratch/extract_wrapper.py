import urllib.request
import re

url = "https://sufalbala.vercel.app/assets/index-Bm5kyEbD.js"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req) as res:
    js_code = res.read().decode('utf-8')

# Search for patterns like a vercel, netlify, github, github.io or other URL:
match = re.search(r'https?://[^\s"\']+', js_code)
if match:
    print(f"Direct match: {match.group(0)}")

# Write JS file text in readable chunks to inspect
with open("src/scratch/wrapper_decoded.txt", "w", encoding="utf-8") as f:
    f.write(js_code)

print("Decoded file written successfully.")
