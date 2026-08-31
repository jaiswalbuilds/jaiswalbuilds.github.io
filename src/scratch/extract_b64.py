import re

# Read the full decrypted E-array and I-array log files
with open("src/scratch/wrapper_decoded.txt", "r", encoding="utf-8") as f:
    js_code = f.read()

# Search for base64 encoded strings in the array definitions:
# They look like: "y2HPBgrmAxn0" or "Bg9N"
b64_pattern = re.compile(r'"([a-zA-Z0-9+/=]{4,})"')
candidates = b64_pattern.findall(js_code)

import base64

decoded_clean = []
for c in set(candidates):
    try:
        missing_padding = len(c) % 4
        if missing_padding:
            c += '=' * (4 - missing_padding)
        val = base64.b64decode(c).decode('utf-8', errors='ignore')
        # Filter for printable ascii strings or typical url patterns
        ascii_only = "".join(ch for ch in val if 32 <= ord(ch) < 127)
        if len(ascii_only) > 4:
            decoded_clean.append(ascii_only)
    except:
        pass

print("Unique Decoded ASCII Substrings:")
# Sort by length
decoded_clean.sort(key=len, reverse=True)
for d in decoded_clean:
    if any(k in d.lower() for k in ["sufal", "vercel", "github", "api", "app", "cloud", "http", "json", "asset", "css", "js", "supports"]):
        print("-", d)
