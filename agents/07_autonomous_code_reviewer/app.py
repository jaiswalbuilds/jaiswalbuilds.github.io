"""
Autonomous Code Reviewer Agent
================================
AI agent that reviews code for bugs, security issues, performance,
and best practices — producing a structured review with fix suggestions.

Architecture: Code Input → AST Analysis Tool + LLM Reviewer → Structured Review Report
Run: streamlit run app.py
"""
import streamlit as st
from langchain_openai import ChatOpenAI
from langchain.agents import create_react_agent, AgentExecutor
from langchain.tools import Tool
from langchain import hub
import ast, os

st.set_page_config(page_title="Code Reviewer Agent", page_icon="🔧", layout="wide")
st.title("🔧 Autonomous Code Reviewer Agent")
st.caption("AI-powered code review for bugs, security, performance, and best practices.")

api_key = st.sidebar.text_input("OpenAI API Key", type="password")
if not api_key:
    st.warning("Enter your OpenAI API key."); st.stop()

os.environ["OPENAI_API_KEY"] = api_key
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)

SAMPLE_CODE = '''
import os
import sqlite3

def get_user(username, password):
    conn = sqlite3.connect("users.db")
    query = f"SELECT * FROM users WHERE username=\'{username}\' AND password=\'{password}\'"
    result = conn.execute(query).fetchall()
    conn.close()
    return result

def process_data(items):
    result = []
    for i in range(len(items)):
        for j in range(len(items)):
            result.append(items[i] + items[j])
    return result

API_KEY = "sk-prod-abc123secretkey"
DEBUG = True
'''

def analyze_syntax(code: str) -> str:
    try:
        tree = ast.parse(code)
        issues = []
        for node in ast.walk(tree):
            if isinstance(node, ast.Call):
                if hasattr(node.func, 'attr') and node.func.attr == 'execute':
                    issues.append("⚠️ Potential SQL injection: dynamic query construction detected")
            if isinstance(node, ast.Assign):
                for t in node.targets:
                    if hasattr(t, 'id') and any(k in t.id.upper() for k in ['KEY', 'SECRET', 'PASSWORD', 'TOKEN']):
                        issues.append(f"🔴 Hardcoded secret detected in variable: {t.id}")
        return "\n".join(issues) if issues else "No obvious syntax-level issues found."
    except SyntaxError as e:
        return f"Syntax Error: {e}"

def count_complexity(code: str) -> str:
    try:
        tree = ast.parse(code)
        nested_loops = 0
        for node in ast.walk(tree):
            if isinstance(node, ast.For):
                for child in ast.walk(node):
                    if isinstance(child, ast.For) and child is not node:
                        nested_loops += 1
        return f"Nested loops detected: {nested_loops}. O(n²) complexity risk." if nested_loops else "No O(n²) complexity detected."
    except Exception as e:
        return str(e)

tools = [
    Tool(name="SyntaxAndSecurityAnalyzer", func=analyze_syntax,
         description="Analyze Python code for syntax issues, SQL injection, and hardcoded secrets."),
    Tool(name="ComplexityAnalyzer", func=count_complexity,
         description="Detect nested loops and O(n²) complexity issues in Python code."),
]

prompt = hub.pull("hwchase17/react")
agent = create_react_agent(llm, tools, prompt)
executor = AgentExecutor(agent=agent, tools=tools, verbose=False, handle_parsing_errors=True)

code = st.text_area("Paste Python Code", value=SAMPLE_CODE, height=300)
review_type = st.multiselect("Review For", ["Security", "Performance", "Best Practices", "Bug Detection"],
                              default=["Security", "Performance", "Bug Detection"])

if st.button("🔍 Review Code", type="primary"):
    with st.spinner("Reviewing code..."):
        instruction = f"""Review this Python code for: {', '.join(review_type)}.
        Use your tools first, then provide a structured review with:
        1. Critical Issues (must fix)
        2. Warnings (should fix)
        3. Suggestions (nice to have)
        4. Fixed code snippets for each critical issue
        
        Code:
        ```python
        {code}
        ```"""
        result = executor.invoke({"input": instruction})
        
    col1, col2 = st.columns([1, 1])
    with col1:
        st.subheader("📋 Code Review Report")
        st.markdown(result["output"])
    with col2:
        st.subheader("⚡ Quick Static Analysis")
        st.markdown("**Syntax & Security:**")
        st.code(analyze_syntax(code), language="text")
        st.markdown("**Complexity:**")
        st.code(count_complexity(code), language="text")

# Refactored update: 2026-02-11 check

# Refactored update: 2026-03-10 check

# Refactored update: 2026-03-11 check

# Refactored update: 2026-04-14 check
