import { 
  StudentProfile, 
  RecruiterProfile, 
  DeanProfile, 
  IndustryProfile,
  SkillAssessmentQuestion,
  SkillAssessmentResult,
  Opportunity,
  CandidateProfile,
  VaultDocument
} from '../types/auth';

// 1. DEFAULT DEMO PROFILES (For instant testing & registration)
export const DEMO_STUDENT_PROFILE: StudentProfile = {
  id: 'usr-student-01',
  name: 'Aarav Deshmukh',
  email: 'aarav.deshmukh@vnit.ac.in',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  role: 'student',
  createdAt: '2026-01-15',
  location: 'Bajaj Nagar, South Nagpur',
  college: 'Visvesvaraya National Institute of Technology (VNIT), Nagpur',
  degree: 'Bachelor of Technology (B.Tech)',
  branch: 'Computer Science & Engineering',
  year: '3rd Year',
  graduationYear: 2027,
  profileCompletion: 72,
  assessmentStatus: 'completed',
  skills: [
    { name: 'Python & FastApi', level: 'Advanced', category: 'Technical' },
    { name: 'Cloud Native / Docker', level: 'Intermediate', category: 'Technical' },
    { name: 'Distributed Systems', level: 'Intermediate', category: 'Technical' },
    { name: 'Data Structures & Algorithms', level: 'Advanced', category: 'Problem Solving' },
    { name: 'UI/UX Wireframing', level: 'Intermediate', category: 'Design' },
    { name: 'Technical Documentation', level: 'Intermediate', category: 'Communication' },
    { name: 'Agile Team Coordination', level: 'Beginner', category: 'Leadership' }
  ],
  interests: ['Edge AI', 'Aerospace Avionics Software', 'High-Scale SaaS Systems', 'Urban Informatics'],
  careerInterests: ['Cloud Solutions Architect', 'AI Systems Engineer', 'Full-Stack SaaS Tech Lead'],
  targetSectors: ['IT & Cloud', 'Aerospace & Defence', 'EV & Mobility'],
  targetLocations: ['MIHAN SEZ', 'Gayatri Nagar IT Park', 'VNIT Deep Tech Zone'],
  documents: [
    {
      id: 'doc-01',
      name: 'Aarav_Deshmukh_Technical_Resume_2026.pdf',
      category: 'Resume',
      fileType: 'PDF Document',
      fileSize: '1.4 MB',
      uploadDate: '12 Aug 2026',
      isVerified: true,
      tags: ['Primary Resume', 'Software', 'Cloud']
    },
    {
      id: 'doc-02',
      name: 'AWS_Certified_Cloud_Practitioner.pdf',
      category: 'Certificates',
      fileType: 'PDF Document',
      fileSize: '840 KB',
      uploadDate: '04 Jun 2026',
      isVerified: true,
      tags: ['Cloud Certification', 'Amazon Web Services']
    },
    {
      id: 'doc-03',
      name: 'Nagpur_Traffic_IoT_Telemetry_Project.zip',
      category: 'Projects',
      fileType: 'ZIP Archive',
      fileSize: '18.2 MB',
      uploadDate: '28 Jul 2026',
      isVerified: false,
      tags: ['IoT', 'Python', 'FastAPI', 'Urban Tech']
    },
    {
      id: 'doc-04',
      name: 'VNIT_Official_Semester_5_Gradecard.pdf',
      category: 'Academic Documents',
      fileType: 'PDF Document',
      fileSize: '620 KB',
      uploadDate: '10 Feb 2026',
      isVerified: true,
      tags: ['VNIT Transcripts', 'CGPA 8.84']
    }
  ],
  savedOpportunities: ['opp-01', 'opp-02'],
  assessmentResult: {
    completedAt: '14 Aug 2026',
    overallReadiness: 78,
    categoryScores: [
      {
        category: 'Technical Skills',
        score: 82,
        maxScore: 100,
        level: 'Proficient',
        description: 'Strong foundation in systems programming, backend architectures, and API design.'
      },
      {
        category: 'Problem Solving',
        score: 85,
        maxScore: 100,
        level: 'Proficient',
        description: 'Excellent algorithmic thinking and structured root-cause debugging.'
      },
      {
        category: 'Communication',
        score: 68,
        maxScore: 100,
        level: 'Developing',
        description: 'Good technical reporting; opportunities to improve cross-functional executive presentations.'
      },
      {
        category: 'Design & UX',
        score: 60,
        maxScore: 100,
        level: 'Developing',
        description: 'Familiar with responsive layouts and component states; needs deeper design token mastery.'
      },
      {
        category: 'Leadership & Teamwork',
        score: 54,
        maxScore: 100,
        level: 'Emerging',
        description: 'Collaborative contributor; ready to take ownership of end-to-end milestone delivery.'
      },
      {
        category: 'Nagpur Industry Alignment',
        score: 76,
        maxScore: 100,
        level: 'Proficient',
        description: 'High readiness for MIHAN SEZ cloud pipelines and Gayatri Nagar SaaS scale-ups.'
      }
    ],
    strengths: [
      'Backend & API Microservice Architecture',
      'Algorithmic Complexity & Optimization',
      'Linux Server Environment & Docker Containerization'
    ],
    skillGaps: [
      {
        skill: 'Enterprise Kubernetes Orchestration',
        userLevel: 'Needs Development',
        industryDemandLevel: 'Critical Shortage',
        localCluster: 'MIHAN SEZ & Tech Corridor',
        gapDescription: 'High demand across Tier-1 IT delivery centers in MIHAN for multi-tenant cluster management.'
      },
      {
        skill: 'Avionics DO-178C Safety Architecture',
        userLevel: 'Needs Development',
        industryDemandLevel: 'High Demand',
        localCluster: 'MIHAN SEZ Aerospace Hub',
        gapDescription: 'Specialized testing protocols required for Boeing & Air India MRO hangars.'
      },
      {
        skill: 'Distributed Data Pipelines / Kafka',
        userLevel: 'Developing',
        industryDemandLevel: 'High Demand',
        localCluster: 'Gayatri Nagar IT Park',
        gapDescription: 'Growing requirement for high-throughput real-time event streaming in SaaS products.'
      },
      {
        skill: 'Applied Generative AI & RAG Deployment',
        userLevel: 'Developing',
        industryDemandLevel: 'High Demand',
        localCluster: 'VNIT TBI / Startup Hub',
        gapDescription: 'Vector indexing and LLM fine-tuning frameworks for enterprise automation.'
      }
    ],
    recommendedNextSkills: [
      {
        skill: 'Production Kubernetes & Helm Charts',
        category: 'Cloud Infrastructure',
        impact: 'Unlocks ₹12L+ Senior Cloud Engineer roles at MIHAN SEZ tech companies',
        relatedHotspotId: 'mihan',
        localTrainingAnchor: 'VNIT Siemens Center of Excellence + TCS Cloud Lab',
        estimatedTime: '4–6 Weeks'
      },
      {
        skill: 'High-Voltage EV BMS Telemetry',
        category: 'EV & Mobility',
        impact: 'High hiring demand at Butibori Industrial Gigafactory corridor',
        relatedHotspotId: 'butibori',
        localTrainingAnchor: 'VNIT Center of Excellence for E-Mobility',
        estimatedTime: '6 Weeks'
      },
      {
        skill: 'FastAPI Microservices with Kafka',
        category: 'Backend Architecture',
        impact: 'Direct alignment with Gayatri Nagar SaaS companies and Persistent Systems',
        relatedHotspotId: 'it-park',
        localTrainingAnchor: 'Persistent Systems Innovation Hub',
        estimatedTime: '3 Weeks'
      }
    ]
  }
};

export const DEMO_RECRUITER_PROFILE: RecruiterProfile = {
  id: 'usr-recruiter-01',
  name: 'Priya Sharma',
  email: 'priya.sharma@tata-advanced.com',
  avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  role: 'recruiter',
  createdAt: '2026-02-01',
  location: 'MIHAN SEZ, South Wardha Road Corridor',
  organization: 'Tata Advanced Systems / Aerospace MRO Division',
  orgType: 'Aerospace & Defence',
  designation: 'Lead Technical Talent Partner — Central India',
  clusterLocation: 'MIHAN SEZ & Tech Corridor',
  activeRequisitionsCount: 6
};

export const DEMO_DEAN_PROFILE: DeanProfile = {
  id: 'usr-dean-01',
  name: 'Dr. Suresh V. Kulkarni',
  email: 'dean.academics@vnit.ac.in',
  avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  role: 'dean',
  createdAt: '2025-11-10',
  location: 'South Ambazari, Bajaj Nagar',
  institution: 'Visvesvaraya National Institute of Technology (VNIT), Nagpur',
  department: 'Academic Affairs & Industry Collaboration Cell',
  designation: 'Dean of Academic Programmes & Head of TBI Incubation',
  totalStudentsAssessed: 1420,
  cohortYear: '2025–2027 Graduating Cohorts'
};

export const DEMO_INDUSTRY_PROFILE: IndustryProfile = {
  id: 'usr-industry-01',
  name: 'Rajesh Mandlekar',
  email: 'r.mandlekar@mahindra-ev.com',
  avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  role: 'industry',
  createdAt: '2025-12-05',
  location: 'Butibori Heavy Industrial Estate, NH-44 Corridor',
  companyName: 'Mahindra E-Mobility & Heavy Powertrain Hub',
  sector: 'EV & Mobility',
  facilityLocation: 'Butibori Industrial Area, Phase II',
  workforceScale: '2,400+ Industrial Technicians & Engineers',
  rndCollaborationsCount: 4
};

// 2. TEN-QUESTION COMPREHENSIVE SKILL ASSESSMENT QUESTIONNAIRE
export const SKILL_ASSESSMENT_QUESTIONS: SkillAssessmentQuestion[] = [
  {
    id: 1,
    category: 'Technical',
    question: 'When architecting a high-traffic backend API service for enterprise telemetry, what is your primary approach to handling sudden traffic bursts?',
    context: 'Evaluates architectural scalability, container orchestration, and asynchronous queuing proficiency.',
    options: [
      {
        text: 'Implement an asynchronous message queue (e.g., Kafka / RabbitMQ) with horizontal auto-scaling workers and rate limiting.',
        score: { technical: 10, problemSolving: 9, communication: 5, design: 3, leadership: 6, industryAlignment: 10 },
        explanation: 'Best-in-class enterprise pattern for decoupled, resilient telemetry pipelines.'
      },
      {
        text: 'Increase single-server RAM and CPU compute instances and use basic in-memory caching.',
        score: { technical: 5, problemSolving: 4, communication: 3, design: 2, leadership: 2, industryAlignment: 4 },
        explanation: 'Vertical scaling has strict physical bottlenecks and high cost.'
      },
      {
        text: 'Implement synchronous database transactions with strict ACID constraints for all inbound events.',
        score: { technical: 3, problemSolving: 3, communication: 2, design: 1, leadership: 1, industryAlignment: 2 },
        explanation: 'Synchronous DB writes will lock connections during traffic surges.'
      },
      {
        text: 'Set up an edge caching CDN layer with microservices and Redis distributed locks.',
        score: { technical: 8, problemSolving: 7, communication: 4, design: 4, leadership: 5, industryAlignment: 8 },
        explanation: 'Solid caching strategy suitable for read-heavy API architectures.'
      }
    ]
  },
  {
    id: 2,
    category: 'Problem Solving',
    question: 'A critical assembly line telemetry sensor in a Butibori manufacturing plant is reporting intermittent 200ms latency spikes every 45 minutes. How do you isolate the root cause?',
    context: 'Assesses systematic debugging methodology and telemetry analytics capability.',
    options: [
      {
        text: 'Correlate time-series telemetry metrics against garbage collection cycles, network packet loss, and scheduled cron jobs across the cluster.',
        score: { technical: 9, problemSolving: 10, communication: 6, design: 3, leadership: 7, industryAlignment: 10 },
        explanation: 'Structured statistical correlation quickly identifies periodic CPU spikes or background locks.'
      },
      {
        text: 'Immediately replace all hardware sensor microcontrollers on the physical shop floor.',
        score: { technical: 3, problemSolving: 2, communication: 3, design: 1, leadership: 2, industryAlignment: 2 },
        explanation: 'High cost with zero diagnostic verification.'
      },
      {
        text: 'Add debug print logs inside the live production loop and monitor the console.',
        score: { technical: 4, problemSolving: 4, communication: 3, design: 2, leadership: 2, industryAlignment: 3 },
        explanation: 'Uncontrolled logging adds further I/O latency in production.'
      },
      {
        text: 'Isolate the sensor payload into a synthetic stress-test harness and benchmark network throughput.',
        score: { technical: 7, problemSolving: 8, communication: 5, design: 3, leadership: 5, industryAlignment: 8 },
        explanation: 'Good reproducible isolation test.'
      }
    ]
  },
  {
    id: 3,
    category: 'Industry Alignment',
    question: 'MIHAN SEZ and Nagpur IT corridor companies are rapidly modernizing from monolithic architectures. Which skill set provides the most direct strategic value in this transition?',
    context: 'Tests understanding of Central India’s tech & aerospace industry landscape.',
    options: [
      {
        text: 'Cloud-Native Containerization, Kubernetes cluster governance, and Zero-Trust API security.',
        score: { technical: 10, problemSolving: 8, communication: 6, design: 4, leadership: 8, industryAlignment: 10 },
        explanation: 'Top requirement across MIHAN Tier-1 delivery hubs.'
      },
      {
        text: 'Legacy desktop visual basic client-server programming with local SQL files.',
        score: { technical: 2, problemSolving: 2, communication: 2, design: 1, leadership: 1, industryAlignment: 1 },
        explanation: 'Obsolete in modern cloud ecosystems.'
      },
      {
        text: 'Basic HTML/CSS website maintenance with shared cPanel hosting.',
        score: { technical: 3, problemSolving: 2, communication: 4, design: 4, leadership: 2, industryAlignment: 3 },
        explanation: 'Low enterprise demand for Tier-1 corridor roles.'
      },
      {
        text: 'Full-Stack TypeScript with Next.js micro-frontends and serverless functions.',
        score: { technical: 8, problemSolving: 7, communication: 6, design: 7, leadership: 6, industryAlignment: 9 },
        explanation: 'High demand across SaaS startup incubators in Gayatri Nagar IT Park.'
      }
    ]
  },
  {
    id: 4,
    category: 'Design',
    question: 'When designing a dashboard for industrial operations managers monitoring 500+ automated CNC machines in Hingna MIDC, what is the best UX practice?',
    context: 'Evaluates cognitive load optimization and visual data hierarchy.',
    options: [
      {
        text: 'Use clear visual hierarchy, exception-based alerts, concise KPI summary cards, and drill-down detail drawers to minimize cognitive fatigue.',
        score: { technical: 6, problemSolving: 8, communication: 8, design: 10, leadership: 7, industryAlignment: 9 },
        explanation: 'Prevents operational blindness and highlights anomalies instantly.'
      },
      {
        text: 'Display all 500 raw sensor data streams on a single giant table with blinking colorful neon lights.',
        score: { technical: 2, problemSolving: 1, communication: 2, design: 1, leadership: 1, industryAlignment: 1 },
        explanation: 'Causes cognitive overload and alarm fatigue.'
      },
      {
        text: 'Hide all data behind 5 layers of dropdown menus without any high-level dashboard summaries.',
        score: { technical: 3, problemSolving: 2, communication: 2, design: 2, leadership: 1, industryAlignment: 2 },
        explanation: 'Obstructs rapid decision making.'
      },
      {
        text: 'Create a spatial map layout with color-coded status badges and responsive density controls.',
        score: { technical: 7, problemSolving: 7, communication: 7, design: 9, leadership: 6, industryAlignment: 9 },
        explanation: 'Excellent spatial-first monitoring experience.'
      }
    ]
  },
  {
    id: 5,
    category: 'Communication',
    question: 'You discover that an aerospace software build does not meet a mandatory FAA/AS9100 quality threshold 4 days before delivery. How do you communicate this to leadership?',
    context: 'Tests executive communication, transparency, and integrity under deadline pressure.',
    options: [
      {
        text: 'Deliver a structured brief detailing the specific compliance variance, the risk impact, and a clear remediation timeline with 2 viable mitigation paths.',
        score: { technical: 7, problemSolving: 9, communication: 10, design: 4, leadership: 10, industryAlignment: 10 },
        explanation: 'Authoritative, solution-oriented executive transparency.'
      },
      {
        text: 'Ship the build silently and hope the client does not run the compliance verification suite.',
        score: { technical: 1, problemSolving: 1, communication: 1, design: 1, leadership: 1, industryAlignment: 1 },
        explanation: 'Catastrophic violation of aerospace safety and ethics.'
      },
      {
        text: 'Blame the junior test engineers in a company-wide email.',
        score: { technical: 1, problemSolving: 1, communication: 1, design: 1, leadership: 1, industryAlignment: 1 },
        explanation: 'Destructive leadership failure.'
      },
      {
        text: 'Inform your direct manager verbally and ask for guidance without presenting any proposed solutions.',
        score: { technical: 4, problemSolving: 4, communication: 5, design: 2, leadership: 3, industryAlignment: 5 },
        explanation: 'Transparent but passive.'
      }
    ]
  },
  {
    id: 6,
    category: 'Leadership',
    question: 'You are leading a cross-functional capstone project between VNIT engineers and an external MIHAN aerospace partner. Team members disagree on architecture. How do you resolve it?',
    context: 'Assesses technical consensus building, facilitation, and milestone ownership.',
    options: [
      {
        text: 'Facilitate a structured Architecture Tradeoff Analysis (ATAM) meeting with objective criteria: latency, safety certification cost, and delivery risk.',
        score: { technical: 8, problemSolving: 9, communication: 9, design: 5, leadership: 10, industryAlignment: 10 },
        explanation: 'Data-driven collaborative consensus building.'
      },
      {
        text: 'Dictate your personal preference unilaterally without hearing team perspectives.',
        score: { technical: 4, problemSolving: 3, communication: 2, design: 2, leadership: 2, industryAlignment: 3 },
        explanation: 'Demotivates high-performing engineering talent.'
      },
      {
        text: 'Avoid the conflict and let each sub-team build incompatible modules separately.',
        score: { technical: 1, problemSolving: 1, communication: 1, design: 1, leadership: 1, industryAlignment: 1 },
        explanation: 'Leads to guaranteed project failure during integration.'
      },
      {
        text: 'Prototype minimal benchmarks for both approaches over 48 hours to validate performance empirical data.',
        score: { technical: 9, problemSolving: 9, communication: 7, design: 4, leadership: 8, industryAlignment: 9 },
        explanation: 'Empirical spike testing provides objective clarity.'
      }
    ]
  },
  {
    id: 7,
    category: 'Technical',
    question: 'In modern Battery Management Systems (BMS) for EV powertrains in Butibori, why is cell-level temperature gradient modeling critical?',
    context: 'Assesses EV mobility domain engineering knowledge.',
    options: [
      {
        text: 'To prevent localized thermal runaway, optimize active cooling pump duty cycles, and maximize lithium pack cycle lifespan.',
        score: { technical: 10, problemSolving: 9, communication: 5, design: 3, leadership: 6, industryAlignment: 10 },
        explanation: 'Core safety and performance criterion in EV gigafactories.'
      },
      {
        text: 'Only for aesthetic digital dashboard speed needle animations.',
        score: { technical: 1, problemSolving: 1, communication: 1, design: 1, leadership: 1, industryAlignment: 1 },
        explanation: 'Irrelevant to battery physics.'
      },
      {
        text: 'To reduce the weight of copper busbars by 50%.',
        score: { technical: 3, problemSolving: 2, communication: 2, design: 1, leadership: 1, industryAlignment: 2 },
        explanation: 'Busbar sizing depends on continuous current, not thermal modeling.'
      },
      {
        text: 'To comply with basic consumer electronics USB-C charging certifications.',
        score: { technical: 3, problemSolving: 2, communication: 2, design: 1, leadership: 1, industryAlignment: 2 },
        explanation: 'Automotive high-voltage standard (AIS-156) is far more rigorous.'
      }
    ]
  },
  {
    id: 8,
    category: 'Problem Solving',
    question: 'An agricultural analytics model for Vidarbha orange orchards is overestimating soil moisture levels in black cotton soil. What is the most effective data correction step?',
    context: 'Evaluates domain-specific machine learning troubleshooting.',
    options: [
      {
        text: 'Calibrate the model against physical TDR soil moisture sensors at varying depths to account for black cotton clay swelling and water retention hysteresis.',
        score: { technical: 9, problemSolving: 10, communication: 6, design: 4, leadership: 6, industryAlignment: 10 },
        explanation: 'Direct agronomic physics calibration fixes synthetic satellite model drift.'
      },
      {
        text: 'Increase the number of hidden neural network layers by 10x without adding new ground-truth training data.',
        score: { technical: 4, problemSolving: 3, communication: 2, design: 2, leadership: 2, industryAlignment: 3 },
        explanation: 'Overfits on flawed inputs without solving the soil physics discrepancy.'
      },
      {
        text: 'Delete the outlier data points manually until the graph looks smooth.',
        score: { technical: 1, problemSolving: 1, communication: 1, design: 1, leadership: 1, industryAlignment: 1 },
        explanation: 'Data manipulation falsifies research results.'
      },
      {
        text: 'Incorporate satellite optical NDVI vegetation indices and temperature evaporation telemetry into the feature set.',
        score: { technical: 8, problemSolving: 8, communication: 5, design: 4, leadership: 5, industryAlignment: 8 },
        explanation: 'Effective multimodal feature engineering.'
      }
    ]
  },
  {
    id: 9,
    category: 'Communication',
    question: 'When presenting a software architecture diagram to non-technical business stakeholders from MIDC industrial estates, what is the best strategy?',
    context: 'Tests business translation and clear stakeholder alignment.',
    options: [
      {
        text: 'Focus on business value, capability outcomes, and end-user workflow impacts while keeping technical deep dives in an appendix.',
        score: { technical: 6, problemSolving: 8, communication: 10, design: 8, leadership: 9, industryAlignment: 9 },
        explanation: 'Builds executive trust and drives investment decisions.'
      },
      {
        text: 'Show 400 lines of raw assembly code and low-level memory register offsets.',
        score: { technical: 3, problemSolving: 2, communication: 1, design: 1, leadership: 1, industryAlignment: 1 },
        explanation: 'Alienates business decision makers.'
      },
      {
        text: 'Use complex technical jargon to appear authoritative without explaining business ROI.',
        score: { technical: 2, problemSolving: 2, communication: 2, design: 1, leadership: 1, industryAlignment: 1 },
        explanation: 'Creates confusion and delays approval.'
      },
      {
        text: 'Use simple block diagrams showing data inflow, intelligence processing, and automated output notifications.',
        score: { technical: 7, problemSolving: 7, communication: 9, design: 8, leadership: 7, industryAlignment: 9 },
        explanation: 'Clear, digestible architectural storytelling.'
      }
    ]
  },
  {
    id: 10,
    category: 'Leadership',
    question: 'As Nagpur scales towards its 2030 vision as India’s central logistics and technology capital, how do you see your individual capability contribution?',
    context: 'Measures strategic vision, local ecosystem commitment, and continuous growth mindset.',
    options: [
      {
        text: 'Continuously mastering high-leverage emerging skills (Cloud Native, AI, Precision Systems) and mentoring peers to strengthen Central India’s talent pipeline.',
        score: { technical: 8, problemSolving: 9, communication: 9, design: 6, leadership: 10, industryAlignment: 10 },
        explanation: 'Exemplifies ecosystem leadership and regional capability growth.'
      },
      {
        text: 'Only learning the minimum required to pass standard college exams with zero hands-on projects.',
        score: { technical: 2, problemSolving: 2, communication: 2, design: 1, leadership: 1, industryAlignment: 1 },
        explanation: 'Lacks ambition for competitive global industry standards.'
      },
      {
        text: 'Building isolated pet projects without ever sharing code or collaborating with others.',
        score: { technical: 5, problemSolving: 5, communication: 3, design: 3, leadership: 3, industryAlignment: 4 },
        explanation: 'Limits professional impact and leadership scale.'
      },
      {
        text: 'Founding or contributing to deep-tech startups and open civic data initiatives centered in Nagpur.',
        score: { technical: 9, problemSolving: 9, communication: 8, design: 7, leadership: 10, industryAlignment: 10 },
        explanation: 'High entrepreneurial capability multiplier.'
      }
    ]
  }
];

// 3. CURATED DEMO OPPORTUNITIES LINKED TO NAGPUR HOTSPOTS
export const DEMO_OPPORTUNITIES: Opportunity[] = [
  {
    id: 'opp-01',
    title: 'Cloud Solutions & Systems Architect Intern',
    organization: 'Persistent Systems / Innovation Lab',
    orgType: 'IT / SaaS Enterprise',
    logoText: 'PS',
    sector: 'IT & Cloud',
    location: 'Gayatri Nagar IT Park, South Nagpur',
    capabilityHotspotId: 'it-park',
    capabilityHotspotName: 'IT Park Corridor',
    type: 'Internship',
    stipendOrSalary: '₹35,000 / month (PPO Track: ₹12.5 LPA)',
    requiredSkills: ['Python', 'Docker & Kubernetes', 'FastAPI', 'Distributed Systems'],
    matchScore: 92,
    description: 'Work with the Cloud CoE team building next-generation multi-tenant SaaS microservices and automated infrastructure telemetry.',
    deadline: '30 Sep 2026',
    applicantsCount: 48,
    featured: true
  },
  {
    id: 'opp-02',
    title: 'Avionics MRO Systems Engineer (Associate)',
    organization: 'Tata Boeing Aerospace / Air India MRO',
    orgType: 'Aerospace Prime',
    logoText: 'BA',
    sector: 'Aerospace & Defence',
    location: 'MIHAN SEZ Aviation Corridor, Wardha Road',
    capabilityHotspotId: 'mihan',
    capabilityHotspotName: 'MIHAN SEZ',
    type: 'Full-time',
    stipendOrSalary: '₹9.5L – ₹14.0L / year',
    requiredSkills: ['Avionics MRO Systems', 'AS9100 Quality Engineering', 'Embedded C/C++', 'Telemetry Analytics'],
    matchScore: 84,
    description: 'Join Central India’s premier aerospace MRO hangar facility testing flight control actuators, radar modules, and FAA quality compliance standards.',
    deadline: '15 Oct 2026',
    applicantsCount: 62,
    featured: true
  },
  {
    id: 'opp-03',
    title: 'EV Battery Management System (BMS) Engineer',
    organization: 'Mahindra E-Mobility & Gigafactory Hub',
    orgType: 'EV & Automotive',
    logoText: 'M&M',
    sector: 'EV & Mobility',
    location: 'Butibori Heavy Industrial Estate, NH-44 Corridor',
    capabilityHotspotId: 'butibori',
    capabilityHotspotName: 'Butibori Heavy Hub',
    type: 'Full-time',
    stipendOrSalary: '₹8.0L – ₹13.5L / year',
    requiredSkills: ['High-Voltage BMS Safety', 'Battery Thermal Simulation', 'CAN Bus Telemetry', 'C/C++'],
    matchScore: 78,
    description: 'Develop firmware algorithms and thermal safety protocols for commercial electric trucks and high-voltage battery packs in South Asia’s largest industrial basin.',
    deadline: '05 Nov 2026',
    applicantsCount: 39,
    featured: false
  },
  {
    id: 'opp-04',
    title: 'Healthcare AI & Clinical Informatics Fellow',
    organization: 'AIIMS Nagpur / Digital Health Research Cell',
    orgType: 'Healthcare Apex',
    logoText: 'AIIMS',
    sector: 'Healthcare',
    location: 'MIHAN AIIMS Campus & Medical Square',
    capabilityHotspotId: 'health-corridor',
    capabilityHotspotName: 'Healthcare Grid',
    type: 'Research Fellowship',
    stipendOrSalary: '₹45,000 / month Fellowship',
    requiredSkills: ['Python & PyTorch', 'Medical Image Segmentation', 'FHIR / EHR Standards', 'Data Privacy'],
    matchScore: 80,
    description: 'Collaborate with senior radiologists and surgeons to develop automated oncology screening models and genomic telemetry pipelines.',
    deadline: '20 Oct 2026',
    applicantsCount: 27,
    featured: false
  },
  {
    id: 'opp-05',
    title: 'Precision AgriTech & Drone Payload Specialist',
    organization: 'Central Institute for Cotton Research (CICR) + AgriStartup',
    orgType: 'AgriTech Research',
    logoText: 'CICR',
    sector: 'AgriTech',
    location: 'Panjabrao Krishi / North-West Corridor',
    capabilityHotspotId: 'agritech-zone',
    capabilityHotspotName: 'AgriTech Corridor',
    type: 'Apprenticeship',
    stipendOrSalary: '₹28,000 / month',
    requiredSkills: ['Drone Payload Telemetry', 'Soil Microbiome Bio-Tech', 'GIS Mapping', 'Python'],
    matchScore: 74,
    description: 'Deploy multispectral drone imaging and automated soil nitrogen sensing across Vidarbha cotton farms to optimize irrigation and crop yields.',
    deadline: '10 Nov 2026',
    applicantsCount: 19,
    featured: false
  },
  {
    id: 'opp-06',
    title: 'Precision CNC Machining & Automation Lead',
    organization: 'Indo-German Tool Room (IGTR) / MIDC Center',
    orgType: 'Manufacturing Hub',
    logoText: 'IGTR',
    sector: 'Manufacturing',
    location: 'Hingna Industrial Zone (MIDC)',
    capabilityHotspotId: 'hingna',
    capabilityHotspotName: 'Hingna MIDC',
    type: 'Full-time',
    stipendOrSalary: '₹6.5L – ₹11.0L / year',
    requiredSkills: ['Precision CNC Machining', 'Tool & Die Fabrication', 'Industrial IoT Telemetry', 'PLC Programming'],
    matchScore: 71,
    description: 'Lead 5-axis CNC programming and automated tool calibration for defense ordinance parts and heavy automotive transmission castings.',
    deadline: '25 Oct 2026',
    applicantsCount: 31,
    featured: false
  }
];

// 4. CANDIDATE PROFILES FOR RECRUITER DISCOVERY
export const DEMO_CANDIDATES: CandidateProfile[] = [
  {
    id: 'cand-01',
    name: 'Aarav Deshmukh',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    college: 'VNIT Nagpur',
    degree: 'B.Tech Computer Science',
    branch: 'CSE',
    graduationYear: 2027,
    verifiedSkills: ['Python / FastAPI', 'Docker & Kubernetes', 'Distributed Systems', 'PostgreSQL'],
    assessmentScore: 82,
    matchScore: 94,
    preferredCorridor: 'MIHAN SEZ / Gayatri Nagar IT Park',
    targetSector: 'IT & Cloud',
    readinessStatus: 'Ready for Interview'
  },
  {
    id: 'cand-02',
    name: 'Sneha Joshi',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    college: 'IIIT Nagpur',
    degree: 'B.Tech Electronics & Comm',
    branch: 'ECE',
    graduationYear: 2026,
    verifiedSkills: ['VLSI Design', 'Verilog / SystemVerilog', 'Embedded C', 'FPGA Prototyping'],
    assessmentScore: 89,
    matchScore: 91,
    preferredCorridor: 'MIHAN SEZ / VNIT DeepTech',
    targetSector: 'Aerospace & Defence',
    readinessStatus: 'Ready for Interview'
  },
  {
    id: 'cand-03',
    name: 'Rohan Patil',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    college: 'Government College of Engineering (GCOEN)',
    degree: 'B.Tech Mechanical Engineering',
    branch: 'Mechanical',
    graduationYear: 2026,
    verifiedSkills: ['EV Powertrain Simulation', 'SolidWorks CAD', 'BMS Thermal Modeling', 'Ansys FEA'],
    assessmentScore: 78,
    matchScore: 88,
    preferredCorridor: 'Butibori Industrial Hub / Hingna MIDC',
    targetSector: 'EV & Mobility',
    readinessStatus: 'Assessment Verified'
  },
  {
    id: 'cand-04',
    name: 'Tanvi Kulkarni',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    college: 'Ramdeobaba University (RCOEM)',
    degree: 'B.Tech Information Technology',
    branch: 'IT',
    graduationYear: 2027,
    verifiedSkills: ['React / TypeScript', 'Next.js', 'UI/UX Design Tokens', 'GraphQL APIs'],
    assessmentScore: 76,
    matchScore: 85,
    preferredCorridor: 'Gayatri Nagar IT Park / Sitabuldi',
    targetSector: 'IT & Cloud',
    readinessStatus: 'Ready for Interview'
  },
  {
    id: 'cand-05',
    name: 'Vikram Shinde',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    college: 'YCCE Nagpur',
    degree: 'B.E. Industrial Production',
    branch: 'Production',
    graduationYear: 2026,
    verifiedSkills: ['5-Axis CNC Programming', 'AS9100 Quality Systems', 'IGTR Tool & Die', 'PLC Automation'],
    assessmentScore: 74,
    matchScore: 82,
    preferredCorridor: 'Hingna MIDC / MIHAN Aerospace',
    targetSector: 'Manufacturing',
    readinessStatus: 'Upskilling in Progress'
  }
];
