import re

with open(r'C:\Users\jaisw\.gemini\antigravity\brain\7fe8bd21-5f48-4bfd-8dd8-2edef4d983cd\.system_generated\steps\1957\content.md', 'r', encoding='utf-8') as f:
    html = f.read()

print("HTML script tags:")
for m in re.finditer(r'<script[^>]*src="([^"]+)"', html):
    print(m.group(0))

print("HTML link stylesheet tags:")
for m in re.finditer(r'<link[^>]*href="([^"]+)"', html):
    print(m.group(0))
