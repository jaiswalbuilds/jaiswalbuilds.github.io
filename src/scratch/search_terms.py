import urllib.request
import re

base_url = "https://sufalbala.vercel.app"

# Fetch JS
js_url = base_url + "/assets/index-Bm5kyEbD.js"
print(f"Fetching JS: {js_url}")
req_js = urllib.request.Request(js_url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req_js) as res:
    js_code = res.read().decode('utf-8')

# Fetch CSS
css_url = base_url + "/assets/index-D7kMNJ5O.css"
print(f"Fetching CSS: {css_url}")
req_css = urllib.request.Request(css_url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req_css) as res:
    css_code = res.read().decode('utf-8')

print("\n--- JS Analysis ---")
print(f"JS Length: {len(js_code)}")
# Let's search case-insensitively for skill keywords
for term in ["skill", "tech", "react", "fram", "anim", "three", "canvas", "spline", "anime", "lottie"]:
    count = len(re.findall(term, js_code, re.IGNORECASE))
    print(f"Found '{term}': {count} times")

print("\n--- CSS Analysis ---")
print(f"CSS Length: {len(css_code)}")
# Search for keyframe animation names, transforms, transitions
for term in ["@keyframes", "transform", "transition", "hover", "animation", "perspective", "skill", "anime"]:
    count = len(re.findall(term, css_code, re.IGNORECASE))
    print(f"Found '{term}': {count} times")

# Let's print out the list of classes found in the CSS
classes = re.findall(r'\.([a-zA-Z0-9_-]+)\s*\{', css_code)
print("Unique CSS Classes (sample):", list(set(classes))[:30])
