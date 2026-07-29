// ─────────────────────────────────────────────────────────────
//  Manish Jaiswal — AI Assistant Knowledge Base
//  Used by both hover tooltips and the full chatbot.
// ─────────────────────────────────────────────────────────────

export const PORTFOLIO_CONTEXT = `
You are an AI guide embedded in Manish Jaiswal's portfolio website.
Keep all answers SHORT (2-4 sentences), conversational, and impressive.
Never say you cannot access the internet — you have full knowledge of this portfolio.

PROFILE:
Name: Manish Kumar (Manish Jaiswal)
Title: Forward Deployed AI Engineer | AI Systems Architect
Location: Bangalore, India
Experience: 8+ years in software engineering, last 3+ years specialising in production AI systems.

IMPACT (headline numbers):
- 30–40% cloud-cost reduction via FinOps multi-agent platform with human-in-the-loop governance
- 60% retrieval accuracy gain + 75% latency reduction through evaluation-gated RAG releases
- 85% cut in report compilation latency via agentic deep-research analyst
- 50% fewer support requests after scaling knowledge ingestion across 400+ OpenAPI specs

EXPERIENCE:
1. Neurals.in | Founding AI Engineer | April 2025–Present
   Domain: FinOps Automation | Remote
   - Architected enterprise FinOps multi-agent platform using LangGraph
   - Stateful cyclic graph state machines + HITL approvals → 30-40% cost reduction
   - Optimiser Agent: rolling z-score anomaly detection on CSV billing logs
   - Research Agent: deep-research analyst reducing report latency by 85%
   - Resolved high-concurrency event loop bottlenecks
   - Tech: Python, FastAPI, LangGraph, OpenAI, Ollama, Kubernetes, Docker, Terraform, MCP

2. Safe Security | Platform Engineer | Aug 2023–March 2025
   Domain: CRQM, CyberSecurity | Bangalore
   - Built Safex: multi-tenant GenAI assistant with enterprise RAG pipelines
   - Custom FAISS index tuning + hierarchical chunking → 60% precision gain, 75% latency cut
   - Async ingestion microservices for 400+ OpenAPI specs
   - Automated AI evaluation suites (groundedness, hallucination, citation accuracy)
   - Tech: Python, FAISS, ChromaDB, LlamaIndex, LangChain, FastAPI, PostgreSQL

3. Harness.io | Platform Engineer | March 2021–July 2023
   Domain: DevOps/ML/AI | Bangalore
   - CI/CD infrastructure: 1000+ builds/day on Kubernetes (EKS, GKE)
   - GitOps automation, Terraform, Helm charts for multi-cloud
   - Delivered platform from beta → GA in 3 months
   - Tech: Kubernetes, Docker, Terraform, AWS, GCP, GitHub Actions, OPA

4. McAfee | Software Engineer | Nov 2018–April 2021
   Domain: Cloud Security | Bangalore
   - Security middleware + policy enforcement for CASB platform
   - High-throughput REST APIs (Java/Python) for IAM compliance
   - gRPC streaming + caching to reduce microservice overhead
   - Tech: Java, Python, gRPC

5. KanTime | Software Engineer | Dec 2015–Nov 2018
   Domain: Healthcare SaaS | Bangalore
   - Scalable backend APIs using Java, Spring Boot, PostgreSQL
   - Redis caching → 40% query latency reduction
   - HIPAA-compliant XML/JSON billing integration adapters
   - Tech: Java, Spring Boot, PostgreSQL, Redis

CORE EXPERTISE:
Forward Deployment & Delivery: Forward Deployment, Customer-Facing Delivery, Production Ownership, Stakeholder Management
AI Evaluation & Reliability: Evaluation Pipelines, Groundedness/Hallucination, Retrieval Quality, Reranking/Chunking, HITL Validation
AI & LLMs: Agentic AI, LangGraph, LangChain, LlamaIndex, CrewAI, AutoGen, MCP, RAG, LLM Inference
Data & Vector: PostgreSQL, FAISS, ChromaDB, Pinecone, Pandas, NumPy
Cloud & Platform: Kubernetes, Docker, Terraform, AWS, GCP, FastAPI, CI/CD
Languages: Python, SQL, Java, Shell

PROJECTS:
- Safex GenAI Dashboard: Enterprise RAG assistant UI with real-time evaluation metrics
- LLM Interview Agent: Autonomous AI-powered interview conductor with voice + evaluation
- Graph Studio: Interactive multi-agent workflow visualiser (live on this portfolio)
- FinOps Orchestrator: LangGraph-based cyclic agent system for cloud cost governance

CONTACT:
- Email: jaiswalmanish060@gmail.com
- Phone: (+91) 8015973380
- LinkedIn: https://www.linkedin.com/in/manish-kumar-74ab6210a/
- GitHub: https://github.com/jaiswalwrites
- Discord: manishjaiswal9689
- Website: https://jaiswalbuilds.github.io/

TARGET ROLES: Forward Deployed AI Engineer at Anthropic, OpenAI, or enterprise AI companies.
AVAILABILITY: Open to senior FDE AI Engineer / AI Systems Architect roles globally.

PERSONALITY: Helpful, precise, technically confident. Speak in first person when summarising sections. Keep answers under 4 sentences unless asked for more.
`;

// Per-section context for hover tooltips and quick summaries
export const SECTION_CONTEXTS = {
  hero: {
    title: 'Profile Overview',
    emoji: '👤',
    voice: `Manish Jaiswal is a Forward Deployed AI Engineer with over 8 years of experience building production AI systems and multi-agent orchestration platforms. He's currently Founding AI Engineer at Neurals.in, where he's driven 30 to 40 percent cloud cost reductions through intelligent LangGraph-based agent workflows. He specialises in enterprise RAG, stateful cyclic graphs, and delivering measurable business outcomes from AI.`,
    summary: `Manish is a Forward Deployed AI Engineer with 8+ years of experience. He specialises in production multi-agent systems (LangGraph), enterprise RAG pipelines, and delivering quantified outcomes — including 30–40% cost reduction at Neurals.in and 60% retrieval accuracy gains at Safe Security.`,
  },
  experience: {
    title: 'Work Experience',
    emoji: '💼',
    voice: `Manish has 8-plus years across five companies — from healthcare SaaS and cloud security at McAfee and KanTime, to cloud-native DevOps at Harness.io, enterprise AI at Safe Security, and now founding AI engineer at Neurals.in. Across those roles he has consistently delivered measurable impact: 30 to 40 percent cost reduction, 60 percent accuracy gains, and 85 percent latency cuts.`,
    summary: `8+ years across 5 companies: KanTime (healthcare SaaS) → McAfee (cloud security) → Harness.io (DevOps/K8s) → Safe Security (RAG/GenAI) → Neurals.in (FinOps multi-agent AI). Consistent pattern: build high-impact production systems with measurable outcomes.`,
  },
  projects: {
    title: 'Projects',
    emoji: '🚀',
    voice: `Manish has shipped multiple production AI systems. Safex is an enterprise RAG assistant that improved retrieval accuracy by 60 percent. The LLM Interview Agent is an autonomous AI-powered interviewer. Graph Studio, live right here on this portfolio, lets you visually design and run multi-agent LangGraph workflows interactively.`,
    summary: `Key projects: Safex GenAI Dashboard (enterprise RAG with 60% accuracy gain), LLM Interview Agent (autonomous AI interviewer), Graph Studio (live interactive multi-agent DAG visualiser), and FinOps Orchestrator (LangGraph cyclic agent system).`,
  },
  skills: {
    title: 'Skills & Stack',
    emoji: '⚡',
    voice: `Manish's core stack spans AI orchestration with LangGraph, LangChain, and LlamaIndex; vector databases like FAISS, ChromaDB, and Pinecone; cloud platforms including Kubernetes on AWS and GCP; and languages Python, Java, and SQL. He's especially strong in building evaluation pipelines, RAG architectures, and forward-deployed AI delivery.`,
    summary: `Core stack: LangGraph · LangChain · LlamaIndex · MCP · FAISS · ChromaDB · FastAPI · Kubernetes · AWS/GCP · Python. Strongest in: agentic AI orchestration, RAG evaluation pipelines, and forward-deployed production AI.`,
  },
};

// Smart fallback Q&A for when no API key is set
export const SMART_QA = [
  {
    triggers: ['who', 'about', 'manish', 'profile', 'introduce', 'yourself'],
    response: `Manish Jaiswal is a Forward Deployed AI Engineer with 8+ years of experience. He specialises in production multi-agent systems (LangGraph), enterprise RAG, and delivering measurable AI outcomes — including 30–40% cloud cost reduction at Neurals.in and 60% retrieval accuracy gains at Safe Security.`
  },
  {
    triggers: ['experience', 'work', 'career', 'job', 'companies', 'history'],
    response: `Manish has worked across 5 companies: KanTime (healthcare SaaS, 2015–18) → McAfee (cloud security, 2018–21) → Harness.io (DevOps/K8s, 2021–23) → Safe Security (RAG/GenAI, 2023–25) → Neurals.in (Founding AI Engineer, 2025–present). Each role showed consistent pattern of building high-impact production systems.`
  },
  {
    triggers: ['skill', 'tech', 'stack', 'langraph', 'rag', 'language', 'tool', 'kubernetes', 'python'],
    response: `Core stack: LangGraph, LangChain, LlamaIndex, MCP for AI orchestration; FAISS, ChromaDB, Pinecone for vector search; FastAPI + Python for services; Kubernetes, Docker, Terraform, AWS/GCP for cloud. Strongest in production agentic AI, RAG evaluation, and forward deployment.`
  },
  {
    triggers: ['project', 'safex', 'interview', 'graph studio', 'finops', 'build'],
    response: `Key projects: Safex GenAI Dashboard (enterprise RAG, 60% accuracy gain), LLM Interview Agent (autonomous AI interviewer), Graph Studio (live multi-agent DAG visualiser on this portfolio), FinOps Orchestrator (LangGraph cyclic agent for cloud cost governance).`
  },
  {
    triggers: ['impact', 'achievement', 'result', 'outcome', 'metric', 'number', 'cost', 'latency'],
    response: `Key impact: 30–40% cloud-cost reduction (FinOps multi-agent + HITL governance), 60% retrieval accuracy + 75% latency improvement (evaluation-gated RAG), 85% faster report compilation (Research Agent), 50% fewer support requests (400+ OpenAPI spec ingestion).`
  },
  {
    triggers: ['contact', 'hire', 'available', 'reach', 'email', 'opportunity', 'role', 'open to', 'phone', 'discord', 'linkedin'],
    response: `Manish is open to Forward Deployed AI Engineer roles. Reach him at jaiswalmanish060@gmail.com, LinkedIn (linkedin.com/in/manish-kumar-74ab6210a), GitHub (github.com/jaiswalwrites), Discord (manishjaiswal9689), or phone (+91) 8015973380.`
  },
  {
    triggers: ['neurals', 'current', 'now', 'latest', 'founding'],
    response: `Currently Founding AI Engineer at Neurals.in (April 2025–present). He architected their enterprise FinOps multi-agent platform using LangGraph — stateful cyclic graphs with HITL approvals delivering 30–40% cloud cost reductions. Stack: Python, FastAPI, LangGraph, OpenAI, Kubernetes, MCP.`
  },
  {
    triggers: ['safe security', 'safex', 'rag', 'retrieval'],
    response: `At Safe Security (Aug 2023–March 2025), Manish built Safex — a multi-tenant GenAI assistant with enterprise RAG. He implemented custom FAISS index tuning + hierarchical chunking that raised precision by 60% and cut latency by 75%. Also built automated hallucination evaluation suites used pre-production.`
  },
  {
    triggers: ['harness', 'devops', 'cicd', 'kubernetes'],
    response: `At Harness.io (2021–2023), Manish built CI/CD infrastructure handling 1,000+ builds/day on Kubernetes (EKS + GKE). He developed GitOps automation with Terraform and Helm, and helped take the developer platform from beta to GA in just 3 months.`
  },
];
