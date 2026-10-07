export const portfolioData = {
  hero: {
    name: "Madhusmita Talukdar",
    roles: [
      "Data Scientist & ML Engineer",
      "Agentic AI Developer",
      "Graphic Designer & Creator",
      "Cloud & Systems Enthusiast"
    ],
    avatar: "/images/avatar.png",
    email: "tmadhusmita011@gmail.com",
    linkedin: "https://www.linkedin.com/in/madhusmitatalukdar",
    github: "https://github.com/Madhusmita111",
    location: "Assam, India"
  },
  about: {
    tagline: "Architecting Intelligent Systems & Visual Narratives with Data & AI",
    description: "Computer Science student specializing in data science, AI systems, and visual design. Building scalable ML pipelines, autonomous agentic workflows, and creative visual communications that make complex data intuitive and actionable."
  },
  
  skills: {
    "Languages": [
      "Python",
      "SQL",
      "C++",
      "Bash Scripting"
    ],

    "Machine Learning & AI": [
      "Scikit-learn",
      "TensorFlow",
      "LangChain",
    ],
    "Cloud & DevOps": [
      "Docker",
      "Kubernetes",
      "Apache Spark",
      "Terraform",
      "Git",
      "MLflow",
      "CI/CD"
    ],
    "Data & Analytics": [
      "Pandas",
      "NumPy",
      "Power BI",
      "Excel",
      "Matplotlib",
      "Seaborn",
      "Statistics & Probability"
    ],
    "Frameworks & Backend": [
      "FastAPI",
      "Flask",
      "PostgreSQL",
      "Jupyter",
      "Google Colab",
      "Agile Methodologies",
      "Microsoft Office Suite"
    ],
    "Design & Creative": [
      "Figma",
      "Canva",
      "UI/UX Design",
      "Visual Storytelling"
    ]
  },

  experience: [
    {
      role: "Graphic Designer",
      organization: "Cisco Student Club",
      location: "Campus Chapter",
      period: "2023 – 2024",
      type: "Design & Creative Media",
      points: [
        "Led creative direction and visual design for campus technical initiatives, producing digital branding, event posters, and promotional media.",
        "Collaborated with technical leads on Figma and Canva to translate complex technology themes into engaging student content."
      ],
      skills: ["Figma", "Canva", "Visual Design", "Branding", "Social Media"]
    },

    {
      role: "Public Speaker",
      organization: "EncryptEdge",
      location: "Campus Community",
      period: "2023 – 2024",
      type: "Public Speaking & Community",
      points: [
        "Anchored and hosted flagship technical events and speaker sessions, moderating live Q&A discussions for 2000+ attendees.",
        "Coordinated event operations and audience engagement across campus programs to deliver seamless community experiences."
      ],
      skills: ["Public Speaking", "Event Hosting", "Event Coordination", "Audience Engagement", "Communication"]
    },

    {
      role: "Field Volunteer & Educator",
      organization: "GVM NGO | Project CRY",
      location: "Field Operations",
      period: "2024",
      type: "Social Impact & Community",
      points: [
        "Conducted grassroots digital literacy and well-being awareness workshops for rural women and children.",
        "Coordinated with local community stakeholders and field teams to ensure effective execution of outreach initiatives."
      ],
      skills: ["Community Outreach", "Education", "Stakeholder Coordination", "Field Operations", "Communication"]
    }
  ],
  // projects: [
  //   {
  //     title: "OpsPulse",
  //     date: "2026",
  //     tech: ["FastAPI", "Apache Kafka", "Apache Spark", "Apache Iceberg", "Kubernetes", "Docker", "Terraform", "Prometheus", "XGBoost"],
  //     thumbnail: "/projects/thumbnail.jpg",
  //     image: "/projects/opspulse.png",
  //     points: [
  //       "Engineered an enterprise-grade cloud-native real-time AI and streaming lakehouse platform to monitor and mitigate quick-commerce operational volatility.",
  //       "Built a dual-pipeline architecture decoupling transactional CDC (PostgreSQL WAL + Debezium) from PySpark structured streaming into Apache Iceberg on AWS S3.",
  //       "Automated deployment infrastructure using modular Terraform, Docker containerization, and horizontal pod autoscaling (HPA 2 → 8 replicas) on Kubernetes.",
  //       "Integrated XGBoost and Isolation Forest anomaly models for dynamic delivery risk prediction with real-time Prometheus/Grafana telemetry."
  //     ],
  //     liveLink: "#",
  //     githubLink: "https://github.com/Madhusmita111/OpsPulse"
  //   },
  //   {
  //     title: "Dowel",
  //     date: "March 2026",
  //     tech: ["Python", "LangChain", "FastAPI", "Pandas", "NumPy"],
  //     thumbnail: "",
  //     image: "/projects/dowel.png",
  //     points: [
  //       "Developed Dowel, an autonomous multi-model agentic AI system that plans, executes, and orchestrates complex multi-step workflows.",
  //       "Implemented dynamic model selection, enabling intelligent routing to the optimal AI model based on task constraints and reasoning depth.",
  //       "Built resilient autonomous agents capable of task decomposition, tool invocation, and recursive workflow execution.",
  //       "Designed a modular and scalable architecture with persistent context handling, short/long-term memory integration, and automatic fallback mechanisms."
  //     ],
  //     liveLink: "#",
  //     githubLink: "https://github.com/Madhusmita111/Dowel"
  //   },
  //   {
  //     title: "Smart URL Safety Checker",
  //     date: "May – July 2025",
  //     tech: ["Python", "Flask", "Scikit-learn", "Pandas", "NumPy"],
  //     thumbnail: "/projects/thumbnail.jpg",
  //     image: "/projects/url-checker.png",
  //     points: [
  //       "Developed a machine learning web application to detect and classify phishing and malicious URLs in real time.",
  //       "Engineered a high-throughput feature extraction pipeline generating 30+ lexical, domain, and host-based attributes from a dataset of 70K+ URLs.",
  //       "Trained, benchmarked, and tuned multiple ML classifiers (Random Forest, XGBoost, SVM, Logistic Regression, KNN), achieving 97% detection accuracy.",
  //       "Deployed the inference engine as a lightweight, scalable REST API using Flask with instant URL categorization via a clean web UI."
  //     ],
  //     liveLink: "#",
  //     githubLink: "https://github.com/Madhusmita111/smart-URL-safety-checker"
  //   },
  //   {
  //     title: "Arnio",
  //     date: "2026",
  //     tech: ["C++", "Python", "Pandas"],
  //     thumbnail: "/projects/thumbnail.jpg",
  //     image: "/projects/arnio.png",
  //     points: [
  //       "Architected a high-performance C++20 accelerated data profiling and quality assurance toolkit engineered for Python and Pandas workflows.",
  //       "Implemented SIMD-vectorized parsers and schema validators capable of auditing multi-million-row CSVs up to 10x faster than traditional pure-Python tools.",
  //       "Engineered zero-copy memory bridges via pybind11 for instantaneous anomaly inspection, missingness mapping, and distribution profiling.",
  //       "Automated schema mismatch detection, null-tolerance verifications, and automated outlier boundary reports."
  //     ],
  //     liveLink: "#",
  //     githubLink: "https://github.com/Madhusmita111/arnio"
  //   },
  //   {
  //     title: "What2Wear AI Chatbot",
  //     date: "May 2025",
  //     tech: ["Python", "JavaScript", "HTML/CSS"],
  //     thumbnail: "/projects/thumbnail.jpg",
  //     image: "/projects/what2wear.png",
  //     points: [
  //       "Implemented an intelligent outfit recommendation chatbot combining user style preferences with live weather forecasting APIs.",
  //       "Engineered algorithmic rule-matching logic achieving 92% recommendation relevance across varying climatic and social scenarios.",
  //       "Optimized client-server latency, delivering 30% faster response times through streamlined caching.",
  //       "Crafted a responsive, clean frontend interface using modern HTML5, CSS3, and JavaScript."
  //     ],
  //     liveLink: "#",
  //     githubLink: "https://github.com/Madhusmita111/What2Wear-AI-chatbot"
  //   },
  //   {
  //     title: "Crime Pattern Analysis",
  //     date: "2025",
  //     tech: ["Python", "Pandas", "NumPy", "Scikit-learn", "Matplotlib", "Seaborn"],
  //     thumbnail: "/projects/thumbnail.jpg",
  //     image: "/projects/crime.jpeg",
  //     points: [
  //       "Processed and mined over 250,000+ urban crime incident records to uncover spatial and temporal trends.",
  //       "Applied density-based and centroid clustering (DBSCAN & K-Means) to detect high-risk geographical crime hotspots with a Silhouette score of 0.92.",
  //       "Reduced raw dataset noise by 35% using robust statistical imputation and geospatial feature engineering.",
  //       "Built interactive spatial visualizations and trend dashboards using Matplotlib, Seaborn, and GeoPandas."
  //     ],
  //     liveLink: "#",
  //     githubLink: "https://github.com/Madhusmita111/Analyzing-Crime-Data-for-City-Safety"
  //   },
  //   {
  //     title: "Reddit–Google Trends Engagement Analysis",
  //     date: "December 2025",
  //     tech: ["Power BI", "Pandas"],
  //     thumbnail: "/projects/thumbnail.jpg",
  //     image: "/projects/reddit.jpeg",
  //     points: [
  //       "Built an interactive Power BI business intelligence dashboard correlating Google Trends search volume with Reddit community engagement.",
  //       "Engineered relational star-schema data models and implemented 15+ advanced DAX calculations for period-over-period growth and sentiment indexation.",
  //       "Conducted cross-platform correlation analysis revealing consumer topic velocity ahead of viral surges.",
  //       "Delivered executive KPI dashboards with dynamic drill-through capabilities."
  //     ],
  //     liveLink: "#",
  //     githubLink: "https://github.com/Madhusmita111/powerbi-dashboard"
  //   },
  //   {
  //     title: "Olympic Dashboard",
  //     date: "April 2025",
  //     tech: ["Excel"],
  //     thumbnail: "/projects/thumbnail.jpg",
  //     image: "/projects/olympics.jpeg",
  //     points: [
  //       "Developed a comprehensive Excel analytics dashboard evaluating historical Olympic athletic performance across nations and disciplines.",
  //       "Applied Power Query for automated multi-source ingestion, schema normalization, and data sanitization.",
  //       "Formulated dynamic multi-dimensional Pivot Tables utilizing GETPIVOTDATA and custom calculated measures.",
  //       "Produced automated visual summaries and medal efficiency indices across 120+ participating committees."
  //     ],
  //     liveLink: "#",
  //     githubLink: "https://github.com/Madhusmita111/Olympic-Data-Analysis"
  //   }
  // ],

  projects: [
  {
    title: "OpsPulse",
    date: "2026",
    summary: "Real-time lakehouse and operational intelligence platform integrating CDC, streaming analytics, machine learning, and cloud-native infrastructure.",
    iconType: "Database",
    tech: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Debezium",
      "Apache Kafka",
      "Apache Spark",
      "Apache Iceberg",
      "AWS S3",
      "XGBoost",
      "Kubernetes",
      "Docker",
      "Terraform",
      "Prometheus",
      "Grafana"
    ],
    points: [
      "Built a real-time operational intelligence platform for quick-commerce, combining CDC, streaming analytics, machine learning, and cloud-native infrastructure.",
      "Implemented a PostgreSQL → Debezium → Kafka → Spark → Apache Iceberg pipeline for continuously processing transactional changes into an analytics-ready lakehouse.",
      "Developed XGBoost-based demand and stockout-risk prediction alongside Isolation Forest anomaly detection to identify operational risks from streaming data.",
      "Containerized services with Docker and deployed them on Kubernetes with HPA-based scaling, while using Terraform for infrastructure provisioning and Prometheus/Grafana for observability."
    ],
    liveLink: "#",
    githubLink: "https://github.com/Madhusmita111/OpsPulse"
  },

  {
    title: "AI Business Intelligence Assistant",
    date: "2026",
    summary: "AI-powered analytics assistant converting natural-language business queries into automated SQL, predictive models, and interactive KPI visualizations.",
    iconType: "Sparkle",
    tech: [
      "Python",
      "LangChain",
      "FastAPI",
      "Streamlit",
      "PostgreSQL",
      "ChromaDB",
      "Pandas",
      "Scikit-learn",
      "XGBoost",
      "Prophet"
    ],
    points: [
      "Built an AI-powered business intelligence assistant that converts natural-language business questions into data-driven insights, analysis, and visualizations.",
      "Connected structured business data in PostgreSQL with analytical workflows using Pandas and machine learning models for forecasting, prediction, and trend analysis.",
      "Implemented a LangChain-based agent workflow with tool-driven data analysis and ChromaDB-backed retrieval for contextual business knowledge.",
      "Developed a Streamlit interface and FastAPI backend to provide an interactive analytics experience for exploring KPIs, trends, forecasts, and business questions."
    ],
    liveLink: "#",
    githubLink: "#"
  },

  {
    title: "Smart URL Safety Checker",
    date: "May – July 2025",
    summary: "Machine learning URL security application detecting malicious and phishing domains with 97% classification accuracy across 70K+ samples.",
    iconType: "ShieldCheck",
    tech: [
      "Python",
      "Flask",
      "Scikit-learn",
      "XGBoost",
      "Pandas",
      "NumPy"
    ],
    points: [
      "Built a machine learning application for detecting potentially malicious and phishing URLs from lexical and domain-level characteristics.",
      "Engineered 30+ URL features, including URL structure, domain characteristics, special-character patterns, and suspicious token indicators, across 70K+ URLs.",
      "Compared multiple classification approaches including Random Forest, XGBoost, SVM, Logistic Regression, and KNN, achieving up to 97% classification accuracy.",
      "Exposed the trained model through a lightweight Flask application for real-time URL analysis and classification."
    ],
    liveLink: "#",
    githubLink: "https://github.com/Madhusmita111/smart-URL-safety-checker"
  },

  {
    title: "Reddit–Google Trends Engagement Analysis",
    date: "December 2025",
    summary: "Interactive Power BI analytics solution and star-schema model analyzing 9,000+ posts to correlate search volume with community momentum.",
    iconType: "ChartLineUp",
    tech: [
      "Python",
      "Pandas",
      "Power BI",
      "Power Query",
      "DAX"
    ],
    points: [
      "Built an interactive Power BI analytics solution combining 9,000+ Reddit posts with Google Trends data to study relationships between search interest and community engagement.",
      "Designed a relational star-schema model in Power Query and transformed raw social and search data into analysis-ready dimensions and fact tables.",
      "Created 15+ DAX measures for engagement, growth, trend comparison, and time-based performance analysis.",
      "Developed interactive KPI dashboards with drill-through analysis to identify topics gaining search momentum and corresponding changes in community engagement."
    ],
    liveLink: "#",
    githubLink: "https://github.com/Madhusmita111/powerbi-dashboard"
  },

  {
    title: "Crime Pattern Analysis",
    date: "2025",
    summary: "Spatial-temporal clustering pipeline mining 250,000+ incident records to discover high-risk urban hotspots and temporal patterns.",
    iconType: "Cpu",
    tech: [
      "Python",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "Matplotlib",
      "Seaborn",
      "GeoPandas"
    ],
    points: [
      "Analyzed 250K+ urban crime records to identify temporal, geographic, and categorical patterns in reported incidents.",
      "Applied K-Means and DBSCAN clustering to identify geographic crime concentrations and recurring high-risk areas.",
      "Performed data cleaning, missing-value treatment, feature engineering, and exploratory analysis to prepare the dataset for statistical and spatial analysis.",
      "Built visual analyses of crime trends and geographic patterns to communicate findings through intuitive data-driven dashboards and plots."
    ],
    liveLink: "#",
    githubLink: "https://github.com/Madhusmita111/Analyzing-Crime-Data-for-City-Safety"
  }
],
  // books: [
  //   {
  //     title: "Designing Data-Intensive Applications",
  //     author: "Martin Kleppmann",
  //     category: "Tech & Systems",
  //     status: "Favorite",
  //     rating: "5/5",
  //     reference: "The definitive guide to distributed systems, replication, partitioning, and consistency models. Foundational to how I design real-time data architectures.",
  //     link: "https://www.oreilly.com/library/view/designing-data-intensive-applications/9781491903063/"
  //   },
  //   {
  //     title: "Deep Work",
  //     author: "Cal Newport",
  //     category: "Psychology & Thinking",
  //     status: "Favorite",
  //     rating: "5/5",
  //     reference: "Rules for focused success in a distracted world. Transformed my approach to deep engineering problem solving and deliberate practice.",
  //     link: "https://www.calnewport.com/books/deep-work/"
  //   },
  //   {
  //     title: "1984",
  //     author: "George Orwell",
  //     category: "Classic Literature",
  //     status: "Read",
  //     rating: "5/5",
  //     reference: "A hauntingly prescient exploration of surveillance, state power, truth, and psychological control. Unforgettable narrative depth.",
  //     link: "https://en.wikipedia.org/wiki/Nineteen_Eighty-Four"
  //   },
  //   {
  //     title: "Crime and Punishment",
  //     author: "Fyodor Dostoevsky",
  //     category: "Classic Literature",
  //     status: "Read",
  //     rating: "5/5",
  //     reference: "A profound psychological dissection of guilt, conscience, moral justification, and redemption through the journey of Raskolnikov.",
  //     link: "https://en.wikipedia.org/wiki/Crime_and_Punishment"
  //   },
  //   {
  //     title: "Atomic Habits",
  //     author: "James Clear",
  //     category: "Psychology & Thinking",
  //     status: "Favorite",
  //     rating: "5/5",
  //     reference: "An actionable framework for compound self-improvement: tiny 1% gains compounding into monumental life and technical transformations.",
  //     link: "https://jamesclear.com/atomic-habits"
  //   },
  //   {
  //     title: "A Thousand Splendid Suns",
  //     author: "Khaled Hosseini",
  //     category: "Classic Literature",
  //     status: "Read",
  //     rating: "5/5",
  //     reference: "An emotionally devastating and resilient portrait of friendship, sacrifice, and survival between two Afghan women across decades of turmoil.",
  //     link: "https://en.wikipedia.org/wiki/A_Thousand_Splendid_Suns"
  //   },
  //   {
  //     title: "The Pragmatic Programmer",
  //     author: "David Thomas & Andrew Hunt",
  //     category: "Tech & Systems",
  //     status: "Favorite",
  //     rating: "5/5",
  //     reference: "Timeless craftsmanship principles: DRY, orthogonality, automated testing, tracer bullets, and taking responsibility for your code.",
  //     link: "https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition/"
  //   },
  //   {
  //     title: "Man's Search for Meaning",
  //     author: "Viktor E. Frankl",
  //     category: "Philosophy & Life",
  //     status: "Read",
  //     rating: "5/5",
  //     reference: "A testament to human resilience: finding purpose through suffering, work, and love even in the darkest circumstances of concentration camps.",
  //     link: "https://en.wikipedia.org/wiki/Man%27s_Search_for_Meaning"
  //   },
  //   {
  //     title: "The Alchemist",
  //     author: "Paulo Coelho",
  //     category: "Philosophy & Life",
  //     status: "Read",
  //     rating: "5/5",
  //     reference: "An inspiring fable about following one's personal legend, listening to one's heart, and recognizing destiny in everyday signs.",
  //     link: "https://en.wikipedia.org/wiki/The_Alchemist_(novel)"
  //   },
  //   {
  //     title: "Python Crash Course",
  //     author: "Eric Matthes",
  //     category: "Tech & Systems",
  //     status: "Read",
  //     rating: "5/5",
  //     reference: "My foundational starting point into programming that ignited my passion for Python, automation, and data exploration.",
  //     link: "https://nostarch.com/pythoncrashcourse2e"
  //   }
  // ],
  education: [
    {
      institution: "Lovely Professional University",
      degree: "Bachelor of Technology (B.Tech.) in Computer Science Engineering",
      grade: "CGPA: 8.07",
      date: "2023 – Present"
    },
    {
      institution: "Spectrum Gurukul",
      degree: "12th Standard",
      grade: "Percentage: 92.6%",
      // date: "2023 – Present"
    },
    {
      institution: "Sankdardev Sishu Bidya Niketan",
      degree: "10th Standard",
      grade: "Percentage: 92.8%",
      // date: "2023 – Present"
    }
  ],
  certificates: [
    {
      name: "Agentic AI Certified Foundations Associate",
      provider: "Oracle",
      icon: "/icons/oracle.jpeg",
      link: "/certificates/oraclecertificate.jpeg"
    },
    {
      name: "Supervised Machine Learning",
      provider: "Coursera x DeepLearning.AI",
      icon: "/icons/coursera.svg",
      link: "/certificates/SupervisedMLcertificate.jpeg"
    },
    {
      name: "SQL (Intermediate)",
      provider: "HackerRank",
      icon: "/icons/Hackerrank.svg",
      link: "/certificates/hackerrankcertificate.jpeg"
    },
    {
      name: "Human Computer Interaction",
      provider: "NPTEL",
      icon: "/icons/nptel.jpeg",
      link: "/certificates/nptelcertificate.jpeg"
    }
  ],
  achievements: [
    {
      title: "Authored Research Paper on OS Security & AI",
      description: "Conducted security analysis and authored a research paper exploring the architectural, kernel, and privacy implications of integrating Windows Copilot into the OS.",
      category: "Research & Publication",
      iconType: "Article",
      highlight: "Research Author",
      date: "2025"
    },
    {
      title: "Oracle Cloud Infrastructure 2024 Foundations Associate",
      description: "Certified in Agentic AI foundations, covering autonomous multi-agent systems, reasoning loops, tool invocation, and LLM architecture.",
      category: "Professional Certification",
      iconType: "Certificate",
      highlight: "Agentic AI Certified",
      date: "2024"
    },
    {
      title: "NPTEL & DeepLearning.AI Specializations",
      description: "Completed rigorous academic coursework in Human-Computer Interaction (NPTEL) and Supervised Machine Learning (DeepLearning.AI x Coursera) with top-tier assessments.",
      category: "Academic Honors",
      iconType: "Trophy",
      highlight: "Top Assessments",
      date: "2024"
    },
    {
      title: "Technical Community & Creative Leadership",
      description: "Led visual design and event moderation across Cisco Student Club and EncryptEdge, anchoring campus tech events and creating high-impact digital branding.",
      category: "Leadership & Community",
      iconType: "Users",
      highlight: "Campus Leader",
      date: "2023 – 2024"
    }
  ],
  awards: [
    {
      title: "Authored research paper on security implications of integrating Windows Copilot into OS",
      titleHtml: "Authored <span class='relative inline-block px-1 mx-0.5 transition-colors duration-300 z-10 group-hover:text-neutral-950 dark:group-hover:text-neutral-50'><span class='absolute inset-x-0 bottom-0 h-[3px] bg-indigo-400 transition-all duration-300 ease-out group-hover:h-full -z-10 rounded-sm opacity-70 group-hover:opacity-100'></span><span class='relative font-medium'>research paper</span></span> on security implications of integrating <span class='relative inline-block px-1 mx-0.5 transition-colors duration-300 z-10 group-hover:text-neutral-950 dark:group-hover:text-neutral-50'><span class='absolute inset-x-0 bottom-0 h-[3px] bg-sky-400 transition-all duration-300 ease-out group-hover:h-full -z-10 rounded-sm opacity-70 group-hover:opacity-100'></span><span class='relative font-medium'>Windows Copilot</span></span> into OS"
    }
    // {
    //   title: "Core technical member and graphic designer in Cisco iGen community and Encrypt Edge",
    //   titleHtml: "Core technical member and <span class='relative inline-block px-1 mx-0.5 transition-colors duration-300 z-10 group-hover:text-neutral-950 dark:group-hover:text-neutral-50'><span class='absolute inset-x-0 bottom-0 h-[3px] bg-pink-400 transition-all duration-300 ease-out group-hover:h-full -z-10 rounded-sm opacity-70 group-hover:opacity-100'></span><span class='relative font-medium'>graphic designer</span></span> in <span class='relative inline-block px-1 mx-0.5 transition-colors duration-300 z-10 group-hover:text-neutral-950 dark:group-hover:text-neutral-50'><span class='absolute inset-x-0 bottom-0 h-[3px] bg-teal-400 transition-all duration-300 ease-out group-hover:h-full -z-10 rounded-sm opacity-70 group-hover:opacity-100'></span><span class='relative font-medium'>Cisco iGen</span></span> community and Encrypt Edge"
    // }
  ]
};
