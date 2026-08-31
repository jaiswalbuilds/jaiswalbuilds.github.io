import urllib.request
import re

url = "https://sufalbala.vercel.app/assets/index-Bm5kyEbD.js"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req) as res:
    js_code = res.read().decode('utf-8')

# Search for patterns like string literals containing vercel, github, netlify, or domain formats
print("Searching for domain names inside the bundle:")
domains = re.findall(r'[a-zA-Z0-9-]+\.[a-zA-Z]{2,6}(?:\.[a-zA-Z]{2,6})?', js_code)
for d in set(domains):
    if not any(k in d for k in ["w3", "w3c", "xml", "Math", "template"]):
        print("-", d)
