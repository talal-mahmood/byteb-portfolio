export const PROJECT_DATA = [
  {
    id: 'self-learning-tool',
    title: 'Self Learning Platform',
    subTitle:
      'AI-powered, Socratic learning assistant for curriculum-driven self study',
    overview:
      'A self-learning platform where an AI tutor guides students through their entire course, prompting critical thinking and delivering tailored practice questions.',
    url: 'https://www.myaiconsult.com',
    videoUrl: '/video/self-learning-tool',
    videoThumbnail: '/video/self-learning-thumb.jpg',
    problemTitle: 'Why did we build this?',
    problemOverview:
      'Students are over-relying on generic AI tools and lack contextual, curriculum-aligned support.',
    problems: [
      'Over-reliance on AI: 86% of students worldwide use AI tools for schoolwork, risking independent learning.',
      'Context gaps: Existing assistants don’t ingest full course curricula for deeply personalized support.',
      'Practice uncertainty: Students struggle to verify the relevance of practice material to their syllabus.',
    ],
    solutionTitle: 'What did we build?',
    solutionOverview:
      'An AI-driven, curriculum-aware tutor that fosters critical thinking and delivers relevant practice.',
    solutions: [
      'Socratic learning flow that prompts students to self-formulate answers.',
      'Curriculum ingestion pipeline to onboard entire courses and classes.',
      'Resource finder leveraging web search and LLM-generated questions based on learning objectives.',
    ],
    problemImage: '/projects/myaiproblem.jpg',
    solutionImage: '/projects/myaisolution.jpg',
  },
  {
    id: 'legal-analysis-agent',
    title: 'Legal Research & Analysis Assistant',
    subTitle:
      'A smart document-intelligence AI for fast, accurate contract review',
    overview:
      'A legal research assistant that ingests diverse document formats, traverses UK contracts & statutes, and delivers tailored analysis in lawyer-ready language.',
    url: 'https://www.unwildered.co.uk/',
    videoUrl: '/video/legal-analysis-agent',
    videoThumbnail: '/video/legal-analysis-thumb.jpg',
    problemTitle: 'Why did we build this?',
    problemOverview:
      'Legal professionals face scattered information and slow, error-prone compliance checks.',
    problems: [
      'Scattered information: Lawyers juggle piles of documents to find relevant clauses.',
      'Document intelligence: Manual comparison to statutes is time-consuming and risky.',
      'Compliance checks: Businesses need instant, accurate legal guidance for fast decisions.',
    ],
    solutionTitle: 'How did we build this?',
    solutionOverview:
      'A scalable, multimodal AI pipeline that delivers rapid, precise legal insights.',
    solutions: [
      'Scalable document ingestion system processing thousands of files in parallel.',
      'Responsive agent that navigates legal sections and extracts key insights.',
      'Multimodal analysis: AI reviews user documents to provide bespoke legal advice.',
    ],
    problemImage: '/projects/cairaproblem.jpg',
    solutionImage: '/projects/cairasolution.jpg',
  },
  {
    id: 'agent-builder',
    title: 'Enterprise AI Q&A & Support Platform',
    subTitle:
      'A cloud-native, multi-agent workflow engine for internal & customer support',
    overview:
      'A SaaS platform with an embeddable chat widget and dashboard, offering 24/7 AI-driven Q&A with full RBAC and seamless branding.',
    url: 'https://askmarti.com',
    videoUrl: '/video/agent-builder',
    videoThumbnail: '/video/agent-builder-thumb.jpg',
    problemTitle: 'Why did we build this?',
    problemOverview:
      'Organizations need scalable, consistent, and governed AI support for employees and customers.',
    problems: [
      'Accessibility: Employees & customers require instant, role-specific answers around the clock.',
      'Scalability: Manual support can’t maintain consistent accuracy at scale.',
      'Governance: Secure, controlled AI deployment with centralized monitoring is essential.',
    ],
    solutionTitle: 'How did we build this?',
    solutionOverview:
      'A resilient microservices architecture powering a multi-agent workflow and robust data pipelines.',
    solutions: [
      'Cloud-native microservices for scalability and independent component deployment.',
      'Multi-agent workflow engine that orchestrates specialized AI models per query.',
      'Versatile data ingestion pipeline for documents, images, and structured Q&A pairs.',
      'Role-Based Access Control integrated into the platform’s core architecture.',
    ],
    problemImage: '/projects/martiproblem.jpg',
    solutionImage: '/projects/martisolution.jpg',
  },
  {
    id: 'lead-intelligence',
    title: 'IBC Compliance AI Assistant',
    subTitle:
      'Architect-focused AI that navigates International Building Code rules instantly',
    overview:
      'An online chat assistant trained on every table, footnote, and clause of the IBC—delivering compliance checks, calculations, and code insights on demand.',
    url: 'https://leandevelopment.us',
    videoUrl: '/video/lead-intelligence',
    videoThumbnail: '/video/lead-intelligence-thumb.jpg',
    problemTitle: 'Why did we build this?',
    problemOverview:
      'Architects waste hours manually checking IBC code books, risking costly mistakes.',
    problems: [
      'Time drain: Manual code lookup slows down design workflows.',
      'Error risk: Missing footnotes or cross-references can cause compliance failures.',
      'Design bottleneck: Manual processes distract from creative architectural work.',
    ],
    solutionTitle: 'How did we build this?',
    solutionOverview:
      'A co-designed, structured AI solution that mirrors expert IBC compliance workflows.',
    solutions: [
      '12-week co-design with architects to capture real-world pain points.',
      'Custom ingestion of IBC text, tables, and footnotes for deep understanding.',
      'Stepwise reasoning engine replicating human expert compliance checks.',
      'Web-based platform tested on live projects—no installs required.',
    ],
    problemImage: '/projects/leanarchitectproblem.jpg',
    solutionImage: '/projects/leanarchitectsolution.jpg',
  },
  {
    id: 'smart-plab-assistant',
    title: 'Voice Agent',
    subTitle: 'Voice-enabled AI assistant for hands-free workflows',
    overview:
      'A voice interface layer on top of AI services, enabling natural-language queries and responses integrated into any app.',
    url: '#',
    videoUrl: '/video/smart-plab-assistant',
    videoThumbnail: '/video/voice-agent-thumb.jpg',
    problemTitle: 'Why did we build this?',
    problemOverview:
      'Users need hands-free, integrated voice control for multitasking and accessibility.',
    problems: [
      'Hands-busy: Users require voice control when multitasking or for accessibility.',
      'UI fragmentation: Switching between voice and text disrupts workflows.',
      'Integration friction: Voice SDKs can be complex to implement and configure.',
    ],
    solutionTitle: 'How did we build this?',
    solutionOverview:
      'A lightweight, privacy-first voice SDK seamlessly falling back to text.',
    solutions: [
      'Plug-and-play voice-agent SDK for quick integration.',
      'Unified multimodal engine for smooth voice-text transitions.',
      'Custom wake-word detection and secure audio pipeline.',
    ],
    problemImage: '/projects/voiceagentproblem.jpg',
    solutionImage: '/projects/voiceagentsolution.jpg',
  },
];
