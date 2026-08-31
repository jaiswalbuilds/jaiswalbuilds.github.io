import re

with open(r'C:\Users\jaisw\.gemini\antigravity\brain\7fe8bd21-5f48-4bfd-8dd8-2edef4d983cd\.system_generated\steps\1957\content.md', 'r', encoding='utf-8') as f:
    html = f.read()

# Let's write a regex to find the stylesheet link in the html
match = re.search(r'href="(/assets/index-.*?\.css)"', html)
if match:
    css_path = match.group(1)
    css_url = "https://sufalbala.vercel.app" + css_path
    print(f"Fetching CSS: {css_url}")
    
    import urllib.request
    req = urllib.request.Request(css_url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as res:
        css_code = res.read().decode('utf-8')
        
    print(f"CSS Code length: {len(css_code)}")
    print("\nFull CSS Code:")
    print(css_code)
else:
    print("CSS file link not found.")
