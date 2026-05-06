"""
Autonomous LLM Interview Agent
================================
Multi-turn agentic interviewer with memory, adaptive questions, and structured scoring.

Architecture: JD Input → Question Generator → Multi-turn Loop (with Memory) → Evaluator → Score Report
Run: streamlit run app.py
"""
import streamlit as st
from langchain_openai import ChatOpenAI
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationChain
from langchain.prompts import PromptTemplate
import json, os

st.set_page_config(page_title="LLM Interview Agent", page_icon="🎙️", layout="wide")
st.title("🎙️ Autonomous LLM Interview Agent")
st.caption("AI technical interviewer with memory, adaptive questioning, and structured evaluation.")

api_key = st.sidebar.text_input("OpenAI API Key", type="password")
if not api_key:
    st.warning("Enter your OpenAI API key to start."); st.stop()

os.environ["OPENAI_API_KEY"] = api_key
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.4)
eval_llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)

role = st.sidebar.selectbox("Interview Role", ["AI Engineer", "ML Engineer", "Data Scientist"])
level = st.sidebar.selectbox("Seniority", ["Junior", "Mid-level", "Senior", "Staff"])
focus = st.sidebar.multiselect("Focus Areas", ["LLMs & GenAI", "System Design", "RAG", "MLOps", "Python"],
                                default=["LLMs & GenAI", "System Design"])

SYSTEM_PROMPT = f"""You are a {level} {role} technical interviewer. Focus: {', '.join(focus)}.
Ask ONE question at a time. After 5 questions, say INTERVIEW_COMPLETE then give JSON:
{{"overall_score":0-10,"recommendation":"Hire/No Hire","strengths":[],"improvement_areas":[],"summary":""}}

History: {{history}}
Human: {{input}}
AI:"""

prompt = PromptTemplate(input_variables=["history", "input"], template=SYSTEM_PROMPT)

if "chain" not in st.session_state:
    memory = ConversationBufferMemory(return_messages=False)
    st.session_state.chain = ConversationChain(llm=llm, memory=memory, prompt=prompt, verbose=False)
    st.session_state.messages = []
    st.session_state.complete = False
    st.session_state.evaluation = None

col1, col2 = st.columns([2, 1])

with col1:
    st.subheader("💬 Interview")
    if not st.session_state.messages:
        if st.button("🚀 Start Interview", type="primary"):
            resp = st.session_state.chain.predict(input="Ready to begin.")
            st.session_state.messages.append({"role": "assistant", "content": resp})
            st.rerun()

    for m in st.session_state.messages:
        with st.chat_message(m["role"]): st.markdown(m["content"])

    if st.session_state.messages and not st.session_state.complete:
        if answer := st.chat_input("Your answer..."):
            st.session_state.messages.append({"role": "user", "content": answer})
            resp = st.session_state.chain.predict(input=answer)
            st.session_state.messages.append({"role": "assistant", "content": resp})
            if "INTERVIEW_COMPLETE" in resp:
                st.session_state.complete = True
                try:
                    start = resp.index("{"); end = resp.rindex("}") + 1
                    st.session_state.evaluation = json.loads(resp[start:end])
                except Exception:
                    st.session_state.evaluation = {"summary": resp}
            st.rerun()

with col2:
    st.subheader("📊 Evaluation")
    if ev := st.session_state.evaluation:
        if "overall_score" in ev:
            st.metric("Score", f"{ev['overall_score']}/10")
            st.metric("Verdict", ev.get("recommendation", "—"))
            for s in ev.get("strengths", []): st.success(s)
            for i in ev.get("improvement_areas", []): st.warning(i)
        st.info(ev.get("summary", ""))
    else:
        answered = len([m for m in st.session_state.messages if m["role"] == "user"])
        st.progress(min(answered / 5, 1.0), text=f"{answered}/5 questions")

    if st.sidebar.button("🔄 Reset"):
        del st.session_state.chain, st.session_state.messages
        del st.session_state.complete, st.session_state.evaluation
        st.rerun()

# Refactored update: 2025-12-30 check

# Refactored update: 2026-01-24 check

# Refactored update: 2026-03-16 check

# Refactored update: 2026-05-06 check
