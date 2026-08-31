import urllib.request
import re

# Fetch the main JS asset from the vercel website
base_url = "https://sufalbala.vercel.app"
print("Fetching HTML source...")
with urllib.request.urlopen(base_url) as response:
    html = response.read().decode('utf-8')

# Find JS file
match = re.search(r'src="(/assets/index-.*?\.js)"', html)
if match:
    js_path = match.group(1)
    js_url = base_url + js_path
    print(f"Fetching JS bundle: {js_url} ...")
    with urllib.request.urlopen(js_url) as js_res:
        js_code = js_res.read().decode('utf-8')
        
    print("Searching for libraries and components inside the compiled code...")
    
    # Check for Framer Motion, Canvas, Three.js or TagCloud
    keywords = {
        "Framer Motion": ["motion.", "AnimatePresence", "framer-motion"],
        "Three.js / Canvas": ["Three", "THREE", "WebGLRenderer", "orbitControls", "THREE.", "ambientLight"],
        "TagCloud / Sphere": ["TagCloud", "sphere", "3d tag", "tag-cloud"],
        "React Icons / Tech Stack": ["React", "TypeScript", "Node", "MongoDB", "Express", "Docker"],
    }
    
    for lib, patterns in keywords.items():
        found = False
        for p in patterns:
            if p in js_code:
                found = True
                break
        print(f"- {lib}: {'FOUND' if found else 'NOT FOUND'}")
        
    # Let's extract some function names/classes relating to skills
    skills_context = re.findall(r'(\w+skill\w+|\w+Skill\w+)', js_code)
    if skills_context:
        print("Skill keywords found:", set(skills_context[:10]))
else:
    print("Could not locate index.js bundle in HTML.")
