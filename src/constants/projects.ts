export const PROJECT_DATA = [
  {
    id: 'self-learning-tool',
    title: 'Self Learning Platform',
    subTitle:
      'AI-powered, Socratic learning assistant for curriculum-driven self study',
    overview:
      'A self learning platform for students to cover their course with the help of an AI assistant.',
    url: 'https://www.myaiconsult.com',
    imageUrl: '/projects/self-learning-tool.png',
    videoUrl: '/video/self-learning-tool.mp4',
    videoThumbnail: '/video/self-learning-thumb.jpg',
    problemTitle: 'Why did we build this?',
    problemOverview:
      'Over reliance on AI, lack of curriculum context, and uncertain practice material quality were making students less effective in their studies.',
    problems: [
      "**Over reliance on AI**: _A 2024 survey revealed that 86% of students worldwide are using AI tools for their schoolwork._ The use of AI is becoming more common, but like every other discovery, there comes a cost. While AI can be a valuable tool for learning, it's important to be mindful of the potential negative impacts of over-reliance and to prioritize opportunities for independent learning, critical thinking, and problem-solving.",
      '**Context over curriculum**: _Most students face the issue of providing the assistant with complete context over their curriculum._ Why not build an assistant that knows the ins and outs of your course?',
      '**Practice over course content**: _Most students want to find material for a particular topic._ In doing so they don’t know if the material is still relevant to their course — so why not have one assistant that tests your knowledge across different subjects?',
    ],
    solutionTitle: 'What did we build?',
    solutionOverview:
      'A Socratic AI tutor that knows your curriculum and generates context-relevant practice material.',
    solutions: [
      '**Socratic learning flow**: _The assistant helps the student with cues to trigger self-thinking and formulation of answers._',
      '**Curriculum ingesting pipeline**: _Allows the platform to create multiple different courses and classes for the assistant to help across._',
      '**Resource finder**: _Uses web search and image generation from LLMs, relying only on learning objectives to find high-quality questions for students to practice._',
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
      'A legal research and analysis assistant for understanding contracts and other legal documents.',
    url: 'https://www.unwildered.co.uk/',
    imageUrl: '/projects/legal-analysis-agent.png',
    videoUrl: '/video/legal-analysis-agent.mp4',
    videoThumbnail: '/video/legal-analysis-thumb.jpg',
    problemTitle: 'Why did we build this?',
    problemOverview:
      'The legal sector suffers from scattered information and slow document analysis, which hinders decision making.',
    problems: [
      "**Scattered Information**: _The legal sector still struggles with a lot of information being scattered._ Lawyers have to go over tons of paper to derive the right sections applicable to a particular case — and that's a tedious job.",
      '**Document Intelligence**: _Contracts and legal documents need to be compared against legal sections._ The time taken to gather all these sections by a human is too much.',
      '**Compliance Checks**: _Important business or personal decisions involving legalities require someone who is up-to-date on laws and has context._ Finding someone who can work as quickly is nearly impossible.',
    ],
    solutionTitle: 'How did we build this?',
    solutionOverview:
      'A multimodal AI legal assistant with large-scale ingestion, retrieval, and tailored formatting for legal output.',
    solutions: [
      '**Smart document ingestion**: _Collects all the legal documents from different formats; scalable to ingest thousands in parallel._',
      '**Fast responsive agent**: _Traverses legal sections and extracts key information, presenting it in legally appropriate formats._',
      '**Multimodal assistant**: _Reviews user documents and provides complex legal analysis and advice._',
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
      'Marti is a SaaS platform that enables secure, branded AI support embedded in websites and dashboards.',
    url: 'https://askmarti.com',
    imageUrl: '/projects/agent-builder.png',
    videoUrl: '/video/agent-builder.mp4',
    videoThumbnail: '/video/agent-builder-thumb.jpg',
    problemTitle: 'Why did we build this?',
    problemOverview:
      'Manual support is slow, inconsistent, and costly—scaling it without control or automation is inefficient.',
    problems: [
      '**Information Accessibility & Support**: _Organizations struggle to make knowledge and support available 24/7._ Employees need quick answers, and customers expect instant responses.',
      "**Scalability & Consistency**: _Manual support can't keep up with demand while maintaining consistent accuracy._",
      '**Controlled AI Deployment**: _Robust governance is required—user roles, access permissions, and behavior monitoring are non-negotiable._',
      '**Seamless Integration & Branding**: _AI tools should blend into existing platforms, both technically and visually._',
      '**Leveraging Advanced AI**: _There was a need for a platform using state-of-the-art GenAI (vision + language) in complex workflows._',
    ],
    solutionTitle: 'How did we build this?',
    solutionOverview:
      'Marti combines cloud-native architecture, multi-agent workflows, and fine-grained access control in one platform.',
    solutions: [
      '**Cloud-native microservices architecture**: _Supports scale, resilience, and modular deployment._',
      // '**SaaS platform**: _Fully hosted, ready-to-use via a web dashboard—no infrastructure setup needed._',
      '**Multi-agent workflow engine**: _Routes tasks to the best AI tools or models, combining results intelligently._',
      '**Versatile data ingestion pipeline**: _Processes documents, images, scraped content, Q&A pairs for the knowledge base._',
      '**RBAC (Role-Based Access Control)**: _Fine-grained access for both users and agents._',
      '**Modern frontend + embeddable widget**: _Dashboard for admins and a lightweight widget for web integration._',
      '**Complete API integration**: _Connects frontend, backend, AI logic, and data systems seamlessly._',
    ],
    problemImage: '/projects/martiproblem.jpg',
    solutionImage: '/projects/martisolution.jpg',
  },
  {
    id: 'lean-architect',
    title: 'IBC Compliance AI Assistant',
    subTitle:
      'Architect-focused AI that navigates International Building Code rules instantly',
    overview:
      'A personal AI-powered expert assistant for architects tackling complex IBC building codes and compliance logic.',
    url: 'https://leandevelopment.us',
    imageUrl: '/projects/lean-architect.png',
    videoUrl: '/video/lean-architect.mp4',
    videoThumbnail: '/video/lean-architect-thumb.jpg',
    problemTitle: 'Why did we build this?',
    problemOverview:
      'Architects spend excessive time interpreting codebooks and are prone to costly compliance errors.',
    problems: [
      '**Stop Wasting Time on Code Books**: _Architects spend countless hours digging through the IBC for numbers like height limits or fixture counts._',
      '**Reduce Costly Mistakes**: _Missing a footnote or cross-reference can cause major delays and costly rework._',
      '**Focus on Design, Not Frustration**: _Manual code checking drains time and creativity._',
    ],
    solutionTitle: 'How did we build this?',
    solutionOverview:
      'We built a smart code reasoning engine after a 12-week co-design phase with architects.',
    solutions: [
      '**Built With Architects**: _A 12-week collaboration helped shape the tool around real pain points._',
      '**Taught the AI the Entire Code**: _Every rule, table, and footnote was parsed and structured so the AI truly understands the IBC._',
      '**Made Info Instantly Findable**: _Smart search surfaces the most relevant rule—fast._',
      '**Smart, Step-by-Step Helper**: _Performs code checks like a human expert by breaking tasks down logically._',
      '**Made It Easy to Access**: _Simple online tool—no install or setup required._',
      '**Tested in the Real World**: _Validated on real architectural scenarios to ensure quality and accuracy._',
    ],
    problemImage: '/projects/leanarchitectproblem.jpg',
    solutionImage: '/projects/leanarchitectsolution.jpg',
  },
  {
    id: 'smart-plab-assistant',
    title: 'Voice Agent',
    subTitle: '24/7 OSCE communication practice partner for medical students',
    overview:
      'An AI-powered simulated patient that provides unlimited practice scenarios and unbiased feedback for PLAB 2 exam preparation.',
    // url: '',
    imageUrl: '/projects/self-learning-tool.png',
    videoUrl: '/video/smart-plab-assistant.mp4',
    videoThumbnail: '/video/voice-agent-thumb.jpg',
    problemTitle: 'Why did we build this?',
    problemOverview:
      'Current OSCE preparation methods create significant barriers for medical students and institutions.',
    problems: [
      '**Limited practice opportunities**: Students are dependent on other people to practice communication skills which are assessed in OSCEs (PLAB 2). This can be quite limiting as skill levels and timetables are often mismatched, making it difficult to adequately practice.',
      '**Costly resources**:  Universities are dependent on hiring paid actors to provide simulated scenarios for students to practice with in the classroom setting. Such actors are expensive for universities, and also too few to satisfy the needs of all the students.',
      '**Subjective feedback**: Feedback from peers, actors and teachers is prone to bias and is often flawed. The grading is anchored to the level of the assessor (i.e. feedback from fellow students often leaves out important areas that need to be worked on).',
    ],
    solutionTitle: 'How did we build this?',
    solutionOverview:
      'A lightweight, privacy-first voice SDK seamlessly falling back to text.',
    solutions: [
      '**On-demand practice**: Students can now practice their communication skills at any time, on their own, in a stress-free environment. They can use our assistant at any time to target their learning needs anywhere, anytime.',
      '**Cost-effective scaling**: Our assistant costs a fraction of the price of a paid actor and provides hundreds of scenarios for students.',
      '**Objective assessment**: The feedback system in our assistant provides input on objective and subjective components alike and mitigates any biases. It is able to identify specific successes and flaws, while providing actionable advice going forward. The marking criteria is anchored to the expected level of the student to ensure it is fair at all times.',
    ],
    problemImage: '/projects/voiceagentproblem.jpg',
    solutionImage: '/projects/voiceagentsolution.jpg',
  },
];
