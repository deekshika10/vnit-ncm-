import { 
  MapClusterNode, 
  MapConnection, 
  SkillItem, 
  IndustryEcosystem, 
  TimelineMilestone, 
  CareerStep 
} from '../types';

export const CITY_OVERVIEW_STATS = {
  totalTalentPool: {
    label: "TOTAL TALENT POOL",
    value: "842,500",
    numeric: 842500,
    subtext: "Technical, engineering, managerial & vocational workforce in Nagpur metropolitan region",
    growth: "+6.4% YoY"
  },
  activeSkillGap: {
    label: "ACTIVE SKILL GAP",
    value: "22.8%",
    numeric: 22.8,
    subtext: "Aggregate deficit between industry tech requisites and fresh graduate output",
    growth: "-2.1% from 2025"
  },
  industryDemand: {
    label: "INDUSTRY DEMAND",
    value: "308,700",
    numeric: 308700,
    subtext: "Projected 24-month recruitment requirements across 8 core capability sectors",
    growth: "+14.2% YoY"
  },
  capabilityClusters: {
    label: "CAPABILITY CLUSTERS",
    value: "67",
    numeric: 67,
    subtext: "Identified economic, industrial, healthcare, and research nodes across Vidarbha hub",
    growth: "+9 new zones"
  }
};

export const CLUSTER_TYPE_CONFIG = {
  talent_hub: {
    label: "Talent Hub",
    color: "#2878A8", // Confident medium blue
    bgLight: "#EBF3F8",
    border: "#BBD5E6",
    dotClass: "bg-[#2878A8]",
    description: "High-density technical & domain workforce centers"
  },
  industry_cluster: {
    label: "Industry Cluster",
    color: "#E58A32", // Warm Orange
    bgLight: "#FCF3EA",
    border: "#F7D5B0",
    dotClass: "bg-[#E58A32]",
    description: "Major manufacturing, IT SEZ, and industrial zones"
  },
  academic_anchor: {
    label: "Academic Anchor",
    color: "#7467A8", // Muted violet
    bgLight: "#F3F1F8",
    border: "#CFCAE4",
    dotClass: "bg-[#7467A8]",
    description: "Premier universities, engineering institutes & research labs"
  },
  skill_gap: {
    label: "Skill Gap",
    color: "#D65F52", // Coral red
    bgLight: "#FBEEEC",
    border: "#F3C2BD",
    dotClass: "bg-[#D65F52]",
    description: "Areas with critical demand-supply capability mismatch"
  },
  growth_opportunity: {
    label: "Growth Opportunity",
    color: "#3C9270", // Earthy green
    bgLight: "#EEF7F2",
    border: "#B2DEC9",
    dotClass: "bg-[#3C9270]",
    description: "High-potential emerging economic & innovation corridors"
  }
};

export const MAP_NODES: MapClusterNode[] = [
  {
    id: "zero-mile",
    name: "Zero Mile Civic & Knowledge Core",
    shortName: "Zero Mile Core",
    category: "Education & Research",
    type: "academic_anchor",
    x: 50,
    y: 42,
    size: "large",
    talentCount: 94000,
    openDemand: 28500,
    skillGapPercentage: 18.4,
    description: "Geographic center of India, administrative capital of Vidarbha, and home to historic colleges, civil research, and judicial-administrative services.",
    corridor: "Central Nagpur / Civil Lines",
    anchors: ["RTM Nagpur University", "GMC Nagpur", "RBI Regional HQ", "CSIR-NEERI"],
    keySkills: ["Public Policy", "Civil Engineering", "Biomedical", "Environmental Tech"],
    growthScore: 78,
    connectedNodeIds: ["vnit-academic", "it-park", "gmc-health", "mihan-sez"]
  },
  {
    id: "mihan-sez",
    name: "MIHAN SEZ (IT & Aviation Hub)",
    shortName: "MIHAN IT & Aero",
    category: "IT & Cloud",
    type: "industry_cluster",
    x: 52,
    y: 72,
    size: "large",
    talentCount: 142000,
    openDemand: 68000,
    skillGapPercentage: 24.6,
    description: "Flagship multi-modal international cargo and IT Special Economic Zone with major tech campuses, aerospace MROs, and AI software centers.",
    corridor: "South Wardha Road Corridor",
    anchors: ["TCS Synergy Park", "Infosys Campus", "Tech Mahindra", "HCL Tech", "Dassault Reliance Aerospace (DRAL)"],
    keySkills: ["Cloud Architecture", "Full-Stack Dev", "Embedded Systems", "Aerospace Manufacturing", "AI/ML Ops"],
    growthScore: 94,
    connectedNodeIds: ["zero-mile", "aiims-iim", "butibori-ind", "mmlp-logistics", "it-park"]
  },
  {
    id: "vnit-academic",
    name: "VNIT & LIT Technological Ecosystem",
    shortName: "VNIT & LIT Hub",
    category: "Education & Research",
    type: "talent_hub",
    x: 42,
    y: 48,
    size: "large",
    talentCount: 118000,
    openDemand: 34000,
    skillGapPercentage: 15.2,
    description: "National Institute of Technology and Laxminarayan Innovation Tech University producing top engineering, chemical, and materials innovators.",
    corridor: "West Central (South Ambazari / Bajaj Nagar)",
    anchors: ["VNIT Nagpur", "LIT University", "YCCE", "VNIT TBI Incubation Center"],
    keySkills: ["VLSI Design", "Chemical Process Engg", "Data Structures", "Robotics", "Power Systems"],
    growthScore: 91,
    connectedNodeIds: ["zero-mile", "it-park", "hingna-midc", "mihan-sez"]
  },
  {
    id: "it-park",
    name: "Gayatri Nagar IT Park & SaaS Corridor",
    shortName: "IT Park Corridor",
    category: "IT & Cloud",
    type: "talent_hub",
    x: 44,
    y: 56,
    size: "medium",
    talentCount: 68000,
    openDemand: 29000,
    skillGapPercentage: 21.0,
    description: "Bustling ecosystem of software product engineering, tech consultancies, digital agencies, and deep-tech SaaS startups.",
    corridor: "Parsodi / Gayatri Nagar / IT Park Rd",
    anchors: ["GlobalLogic", "Persistent Systems", "Infocepts", "Smart Data Systems", "Nagpur Startups Hub"],
    keySkills: ["React/Next.js", "Python / GenAI", "Business Intelligence", "Cybersecurity", "DevOps"],
    growthScore: 88,
    connectedNodeIds: ["vnit-academic", "mihan-sez", "zero-mile", "hingna-midc"]
  },
  {
    id: "butibori-ind",
    name: "Butibori Mega Industrial Estate",
    shortName: "Butibori Mfg",
    category: "Manufacturing",
    type: "industry_cluster",
    x: 64,
    y: 88,
    size: "large",
    talentCount: 125000,
    openDemand: 42000,
    skillGapPercentage: 28.3,
    description: "One of Asia's largest continuous industrial zones housing massive manufacturing plants, advanced plastics, defense propellants, and heavy metallurgy.",
    corridor: "South NH-44 Corridor",
    anchors: ["Solar Industries (Defense)", "Indorama Synthetics", "CEAT Tyres", "Mahindra Heavy Fab", "Morarjee Mills"],
    keySkills: ["Industrial Automation", "Polymer Chemistry", "Defense Ordinance Tech", "CNC Operations", "Six Sigma"],
    growthScore: 86,
    connectedNodeIds: ["mihan-sez", "mmlp-logistics", "hingna-midc"]
  },
  {
    id: "hingna-midc",
    name: "Hingna Industrial & Precision Engineering",
    shortName: "Hingna MIDC",
    category: "Manufacturing",
    type: "industry_cluster",
    x: 30,
    y: 58,
    size: "large",
    talentCount: 88000,
    openDemand: 26500,
    skillGapPercentage: 26.1,
    description: "Traditional and modernized industrial base specializing in automotive tooling, electrical equipment, and precision contract manufacturing.",
    corridor: "West Nagpur Belt",
    anchors: ["Bajaj Auto Components", "KEC International", "Mahindra Tractors Unit", "Vidarbha Defense Cluster MSMEs"],
    keySkills: ["Precision Machining", "CAD/CAM / SolidWorks", "EV Drivetrain Assembly", "Quality Control", "Lean Mfg"],
    growthScore: 79,
    connectedNodeIds: ["vnit-academic", "it-park", "butibori-ind", "samruddhi-gateway"]
  },
  {
    id: "aiims-iim",
    name: "IIM & AIIMS Knowledge Citadel",
    shortName: "IIM / AIIMS Campus",
    category: "Education & Research",
    type: "academic_anchor",
    x: 58,
    y: 78,
    size: "medium",
    talentCount: 38000,
    openDemand: 16200,
    skillGapPercentage: 12.5,
    description: "Premier national institutions spearheading executive management, clinical innovation, healthcare data analytics, and policy leadership.",
    corridor: "MIHAN South Sector",
    anchors: ["AIIMS Nagpur", "IIM Nagpur (InFED Incubator)", "National Law University (NLU)"],
    keySkills: ["Healthcare Analytics", "Supply Chain Strategy", "Corporate Finance", "Clinical Research", "Legal Tech"],
    growthScore: 96,
    connectedNodeIds: ["mihan-sez", "butibori-ind", "mmlp-logistics"]
  },
  {
    id: "mmlp-logistics",
    name: "Nagpur Multi-Modal Logistics Park (MMLP)",
    shortName: "MMLP Logistics",
    category: "Logistics",
    type: "growth_opportunity",
    x: 70,
    y: 74,
    size: "large",
    talentCount: 72000,
    openDemand: 39000,
    skillGapPercentage: 31.2,
    description: "Strategic inland dry port, CONCOR container depot, cold chain infrastructure, and national freight distribution nerve center.",
    corridor: "Borkhedi / Sindi Freight Corridor",
    anchors: ["CONCOR Inland Container Depot", "Adani Logistics Park", "Amazon Fulfillment Center", "DHL Global Hub"],
    keySkills: ["Warehouse Automation", "Supply Chain Optimization", "Cold Chain IoT", "Freight Analytics", "Customs Mgmt"],
    growthScore: 95,
    connectedNodeIds: ["mihan-sez", "butibori-ind", "samruddhi-gateway"]
  },
  {
    id: "samruddhi-gateway",
    name: "Samruddhi Mahamarg Economic Node",
    shortName: "Samruddhi Hub",
    category: "Logistics",
    type: "growth_opportunity",
    x: 22,
    y: 40,
    size: "medium",
    talentCount: 31000,
    openDemand: 19500,
    skillGapPercentage: 29.8,
    description: "High-speed expressway interchange connecting Nagpur to JNPT Mumbai port in 8 hours, spawning agro-processing and smart logistics clusters.",
    corridor: "Nagpur-Mumbai Expressway Interchange",
    anchors: ["Maharashtra State Agro Industries", "Fast Freight Hubs", "Express Industrial Parks"],
    keySkills: ["Fleet Telematics", "Agro-Logistics", "Intermodal Routing", "Infrastructure Management"],
    growthScore: 92,
    connectedNodeIds: ["hingna-midc", "mmlp-logistics", "kalmeshwar-belt"]
  },
  {
    id: "aerospace-sez",
    name: "Nagpur Aerospace & Defence Park",
    shortName: "Aerospace SEZ",
    category: "Aerospace & Defence",
    type: "growth_opportunity",
    x: 58,
    y: 65,
    size: "medium",
    talentCount: 29000,
    openDemand: 18400,
    skillGapPercentage: 34.5,
    description: "Specialized defense hub producing aerostructures for Rafale and Falcon jets, avionics calibration, and defense ammunition exports.",
    corridor: "MIHAN Aviation Zone",
    anchors: ["Dassault Reliance Aerospace Ltd", "Air India MRO Depot", "GMR Aero Technic", "BrahMos Feeder Units"],
    keySkills: ["Avionics Testing", "Titanium Machining", "Composite Materials", "AS9100 Quality Systems", "Aerodynamics"],
    growthScore: 97,
    connectedNodeIds: ["mihan-sez", "butibori-ind", "zero-mile"]
  },
  {
    id: "gmc-health",
    name: "Central Health & Biomedical Cluster",
    shortName: "Health Sciences",
    category: "Healthcare",
    type: "talent_hub",
    x: 58,
    y: 44,
    size: "medium",
    talentCount: 46000,
    openDemand: 15200,
    skillGapPercentage: 17.1,
    description: "Medical capital of central India treating patients from 5 states; hub for tertiary healthcare, nursing, and clinical diagnostics.",
    corridor: "Medical Square / Dhantoli / Ramdaspeth",
    anchors: ["GMC & Hospital", "IGGMC", "Kingsway Hospitals", "Alexis / Max Healthcare", "Orange City Hospital"],
    keySkills: ["Clinical Informatics", "Nursing & Paramedical", "Medical Imaging", "Pharmaceutical Science"],
    growthScore: 82,
    connectedNodeIds: ["zero-mile", "aiims-iim"]
  },
  {
    id: "kalmeshwar-belt",
    name: "Kalmeshwar Steel & Manufacturing Belt",
    shortName: "Kalmeshwar Belt",
    category: "Manufacturing",
    type: "skill_gap",
    x: 28,
    y: 28,
    size: "small",
    talentCount: 36000,
    openDemand: 14000,
    skillGapPercentage: 35.0,
    description: "Heavy metallurgy, galvanized steel processing, paper mills, and industrial chemical units facing technical automation transition.",
    corridor: "North-West Corridor (Katol Road)",
    anchors: ["JSW Steel Coated Products", "Haldiram's Mega Food Park", "Pitti Engineering"],
    keySkills: ["Metallurgical Testing", "Food Safety Tech", "Boiler Operations", "Industrial Electricals"],
    growthScore: 74,
    connectedNodeIds: ["hingna-midc", "samruddhi-gateway", "zero-mile"]
  },
  {
    id: "kamptee-energy",
    name: "Kamptee - Koradi Energy & Mining Corridor",
    shortName: "Koradi Energy",
    category: "Engineering",
    type: "industry_cluster",
    x: 66,
    y: 26,
    size: "medium",
    talentCount: 42000,
    openDemand: 12800,
    skillGapPercentage: 23.4,
    description: "Super-thermal power generation stations, coal mining R&D, and electrical grid infrastructure serving western India.",
    corridor: "North-East Corridor",
    anchors: ["Koradi Thermal Power Station (MAHAGENCO)", "Khaparkheda Thermal Power", "Western Coalfields Limited (WCL) HQ"],
    keySkills: ["Grid Optimization", "Mining Geology", "Renewable Integration", "Turbine Maintenance", "Scada Systems"],
    growthScore: 75,
    connectedNodeIds: ["zero-mile", "agritech-center"]
  },
  {
    id: "agritech-center",
    name: "Vidarbha Agro-Biotech & Citrus Research",
    shortName: "AgriTech Center",
    category: "AgriTech",
    type: "growth_opportunity",
    x: 74,
    y: 38,
    size: "small",
    talentCount: 22000,
    openDemand: 9800,
    skillGapPercentage: 27.5,
    description: "National premier research on citrus, cotton genomics, organic processing, and precision farming sensors.",
    corridor: "East Nagpur / PDKV Extension",
    anchors: ["ICAR-Central Institute for Citrus Research (CICR)", "Central Institute for Cotton Research", "PDKV Agriculture College"],
    keySkills: ["Soil Genomics", "Citrus Post-Harvest Tech", "Drone Crop Analytics", "Biological Pest Control"],
    growthScore: 84,
    connectedNodeIds: ["zero-mile", "kamptee-energy", "mmlp-logistics"]
  },
  {
    id: "ev-cluster",
    name: "Nagpur EV & Clean Mobility Hub",
    shortName: "EV Mobility Hub",
    category: "EV & Mobility",
    type: "growth_opportunity",
    x: 38,
    y: 68,
    size: "small",
    talentCount: 19500,
    openDemand: 11200,
    skillGapPercentage: 38.2,
    description: "Fast-emerging electric 2-wheeler, battery swapping, powertrain fabrication, and commercial fleet decarbonization center.",
    corridor: "Hingna-Butibori Link",
    anchors: ["Nagpur Smart City EV Pilots", "Lithium Battery Pack Assemblers", "Mahindra Electric Feeder Suppliers"],
    keySkills: ["BMS Engineering", "Battery Chemistry", "Electric Motor Rewinding", "Telematics & Charging Protocols"],
    growthScore: 93,
    connectedNodeIds: ["hingna-midc", "butibori-ind", "vnit-academic"]
  }
];

export const MAP_CONNECTIONS: MapConnection[] = [
  { fromId: "zero-mile", toId: "vnit-academic", type: "knowledge", label: "Metro Line 2 / Academic Axis" },
  { fromId: "zero-mile", toId: "it-park", type: "knowledge", label: "Wardha Rd Innovation Link" },
  { fromId: "zero-mile", toId: "mihan-sez", type: "metro", label: "Nagpur Metro Orange Line" },
  { fromId: "vnit-academic", toId: "it-park", type: "knowledge", label: "Tech Transfer Highway" },
  { fromId: "vnit-academic", toId: "hingna-midc", type: "freight", label: "Industrial R&D Corridor" },
  { fromId: "it-park", toId: "mihan-sez", type: "metro", label: "Software Workforce Spine" },
  { fromId: "mihan-sez", toId: "aerospace-sez", type: "knowledge", label: "Defense SEZ Internal" },
  { fromId: "mihan-sez", toId: "aiims-iim", type: "knowledge", label: "Campus Boulevard" },
  { fromId: "mihan-sez", toId: "butibori-ind", type: "freight", label: "NH-44 Industrial Highway" },
  { fromId: "butibori-ind", toId: "mmlp-logistics", type: "freight", label: "Rail & Dry Port Spine" },
  { fromId: "mmlp-logistics", toId: "samruddhi-gateway", type: "expressway", label: "Samruddhi Expressway Link" },
  { fromId: "hingna-midc", toId: "samruddhi-gateway", type: "expressway", label: "Western Ring Road" },
  { fromId: "hingna-midc", toId: "ev-cluster", type: "freight", label: "Automotive Supplier Belt" },
  { fromId: "ev-cluster", toId: "butibori-ind", type: "freight", label: "Component Supply Arc" },
  { fromId: "zero-mile", toId: "gmc-health", type: "knowledge", label: "Medical Square Axis" },
  { fromId: "zero-mile", toId: "kamptee-energy", type: "freight", label: "Power Grid Corridor" },
  { fromId: "zero-mile", toId: "kalmeshwar-belt", type: "freight", label: "Katol Rd Steel Link" },
  { fromId: "zero-mile", toId: "agritech-center", type: "knowledge", label: "Agronomy Research Belt" }
];

export const SKILL_CATEGORIES_DATA: SkillItem[] = [
  {
    id: "software-cloud",
    name: "Software & Cloud Architecture",
    category: "Software & Cloud",
    demandGrowth: "+26% YoY",
    supplyCount: 145000,
    demandCount: 82000,
    gapPercent: 18.5,
    readinessLevel: "Moderate",
    topInstitutions: ["VNIT Nagpur", "RCOEM / Ramdeobaba Univ", "YCCE", "IIIT Nagpur"],
    topEmployers: ["TCS Synergy Park", "Infosys MIHAN", "Persistent Systems", "Tech Mahindra", "Infocepts"],
    emergingSkills: ["AWS/GCP Architectures", "Kubernetes", "Microservices", "Serverless TypeScript", "Spring Boot"]
  },
  {
    id: "data-ai",
    name: "Data Engineering & Applied AI",
    category: "Data & AI",
    demandGrowth: "+41% YoY",
    supplyCount: 42000,
    demandCount: 36000,
    gapPercent: 34.0,
    readinessLevel: "Critical Gap",
    topInstitutions: ["IIIT Nagpur", "VNIT Dept of CS", "IIM Nagpur InFED", "G.H. Raisoni College"],
    topEmployers: ["GlobalLogic", "Persistent Systems", "Infosys AI Practice", "Dassault Systems AI Hub"],
    emergingSkills: ["LLM Orchestration", "PyTorch", "Data Lakehouses", "MLOps", "Computer Vision for Defect Detection"]
  },
  {
    id: "engineering-robotics",
    name: "Advanced Engineering & Automation",
    category: "Engineering",
    demandGrowth: "+19% YoY",
    supplyCount: 180000,
    demandCount: 65000,
    gapPercent: 21.0,
    readinessLevel: "Moderate",
    topInstitutions: ["VNIT Nagpur", "LIT University", "Government Polytechnic", "KDK College"],
    topEmployers: ["Solar Industries", "Bajaj Auto Vendors", "KEC International", "Pitti Engineering"],
    emergingSkills: ["PLC/SCADA Programming", "Robotic Arm Calibration", "Digital Twins", "Mechatronics"]
  },
  {
    id: "aerospace-defense",
    name: "Aerospace Precision & Defence Systems",
    category: "Manufacturing",
    demandGrowth: "+38% YoY",
    supplyCount: 18500,
    demandCount: 16800,
    gapPercent: 39.5,
    readinessLevel: "Critical Gap",
    topInstitutions: ["VNIT Mechanical/Materials", "Government Tool Room (MSME)", "Air Force Station Sonegaon Training"],
    topEmployers: ["Dassault Reliance Aerospace (DRAL)", "Air India MRO", "Solar Industries Defense Unit", "BrahMos Suppliers"],
    emergingSkills: ["AS9100 Avionics Standards", "Titanium 5-Axis Milling", "Composite Layup", "Explosive Chemistry & Safety"]
  },
  {
    id: "logistics-supply",
    name: "Multi-Modal Logistics & Smart Supply",
    category: "Logistics",
    demandGrowth: "+31% YoY",
    supplyCount: 64000,
    demandCount: 44000,
    gapPercent: 25.8,
    readinessLevel: "Moderate",
    topInstitutions: ["IIM Nagpur (Supply Chain Center)", "Rashtrasant Tukadoji Maharaj University", "Dharampeth College"],
    topEmployers: ["CONCOR Multi-Modal Park", "Amazon Fulfilment Sindi", "DHL Express Hub", "Adani Logistics"],
    emergingSkills: ["WMS Automation", "RFID/IoT Telematics", "Customs Clearing & Freight Brokerage", "Cold-Chain Monitoring"]
  },
  {
    id: "healthcare-bio",
    name: "Healthcare Sciences & Clinical Analytics",
    category: "Healthcare",
    demandGrowth: "+22% YoY",
    supplyCount: 78000,
    demandCount: 32000,
    gapPercent: 16.2,
    readinessLevel: "High",
    topInstitutions: ["AIIMS Nagpur", "Government Medical College (GMC)", "IGGMC", "Datta Meghe Institute"],
    topEmployers: ["AIIMS Nagpur Hospital", "Kingsway Hospitals", "Alexis / Max Healthcare", "Lupin Pharma Unit MIHAN"],
    emergingSkills: ["Medical Diagnostics Informatics", "Sterile Bio-Processing", "Clinical Trial Data Mgmt", "Critical Care Paramedics"]
  },
  {
    id: "ev-mobility",
    name: "EV Power Electronics & Battery Systems",
    category: "Emerging Technologies",
    demandGrowth: "+47% YoY",
    supplyCount: 14000,
    demandCount: 19500,
    gapPercent: 44.2,
    readinessLevel: "Critical Gap",
    topInstitutions: ["VNIT Electrical", "YCCE Centre of EV Excellence", "MSME Indo-German Tool Room"],
    topEmployers: ["Mahindra EV Components", "E-Rickshaw OEM Startups", "Adani Total EV Infra", "Solar E-Mobility"],
    emergingSkills: ["Battery Management Systems (BMS)", "Thermal Runaway Modeling", "High-Voltage Inverters", "CAN Bus Diagnostics"]
  },
  {
    id: "design-product",
    name: "Product Design & Industrial UI/UX",
    category: "Design",
    demandGrowth: "+24% YoY",
    supplyCount: 22000,
    demandCount: 13500,
    gapPercent: 20.1,
    readinessLevel: "Moderate",
    topInstitutions: ["VNIT Architecture & Planning", "LAD College of Applied Art", "IIIT Nagpur Design Lab"],
    topEmployers: ["Infocepts UX Studio", "Persistent Product Labs", "MIHAN Product Studios", "Regional D2C Brands"],
    emergingSkills: ["Design Systems", "Design for Additive Manufacturing (DFAM)", "HMI for Mobility", "Enterprise B2B Workflows"]
  }
];

export const INDUSTRY_ECOSYSTEMS_DATA: IndustryEcosystem[] = [
  {
    id: "mihan-ecosystem",
    name: "MIHAN Special Economic Zone",
    locationArea: "South Nagpur (Wardha Road)",
    tagline: "India's largest multi-modal airport, aerospace SEZ & Tier-2 IT titan",
    category: "IT & Cloud",
    workforceSize: 142000,
    annualGrowth: "+18.5% YoY",
    primaryFocus: [
      "Enterprise Cloud & IT Services",
      "Aerospace Structure Fabrication",
      "Civil Aviation MRO Facilities",
      "Specialty Pharmaceuticals & MedTech"
    ],
    keyAnchors: [
      "Tata Consultancy Services (TCS Synergy)",
      "Infosys Development Center",
      "Dassault Reliance Aerospace Ltd (DRAL)",
      "Tech Mahindra",
      "Lupin Pharma & Hexaware"
    ],
    infrastructureAssets: [
      "Direct Airport Runway Taxiway Connection",
      "Nagpur Metro Orange Line Terminal",
      "Dedicated 220kV Dual-feed Substation",
      "Customs In-SEZ Cleared Port"
    ],
    talentDemandTrend: "Accelerating",
    description: "Spanning over 4,300 hectares, MIHAN is Central India's premier international growth engine combining IT software hubs with aircraft maintenance and Falcon/Rafale component manufacturing.",
    mapNodeId: "mihan-sez"
  },
  {
    id: "hingna-ecosystem",
    name: "Hingna Industrial Cluster (MIDC)",
    locationArea: "West Nagpur",
    tagline: "Precision tooling, automotive tier-suppliers & vibrant MSME foundry",
    category: "Manufacturing",
    workforceSize: 88000,
    annualGrowth: "+9.2% YoY",
    primaryFocus: [
      "Automotive Pressed Metal Parts",
      "High-Tension Transmission Towers",
      "Plastic Injection Tooling",
      "Defense Ancillary Production"
    ],
    keyAnchors: [
      "KEC International (RPG Group)",
      "Bajaj Auto Vendor Collective",
      "Mahindra Farm Equipment Div",
      "Indo-German Tool Room (IGTR)"
    ],
    infrastructureAssets: [
      "Proximity to Ambazari & VNIT",
      "MIDC Common Effluent Treatment",
      "Subsidized MSME Testing Centers",
      "Outer Ring Road Express Access"
    ],
    talentDemandTrend: "Steady",
    description: "Established as Nagpur's core manufacturing foundry, Hingna is rapidly pivoting toward high-precision CNC tooling, EV chassis fabrication, and defense sub-assembly production.",
    mapNodeId: "hingna-midc"
  },
  {
    id: "butibori-ecosystem",
    name: "Butibori Mega Industrial Zone",
    locationArea: "South NH-44 Corridor (25km from City)",
    tagline: "Heavy chemicals, defense propellants, synthetic textiles & metallurgy",
    category: "Manufacturing",
    workforceSize: 125000,
    annualGrowth: "+11.4% YoY",
    primaryFocus: [
      "Defense Ammunition & Pinaka Rockets",
      "Polyester Synthetic Yarns",
      "Automotive Radial Tyres",
      "Cold-Rolled Steel Structures"
    ],
    keyAnchors: [
      "Solar Industries India Ltd",
      "Indorama Synthetics Ltd",
      "CEAT Tyres Mega Plant",
      "Morarjee Textiles",
      "Gammon India Infrastructure"
    ],
    infrastructureAssets: [
      "Dedicated Industrial Railway Siding",
      "Large-scale Chemical Storage Facilities",
      "Direct NH-44 6-lane access to Hyderabad/Delhi",
      "Captive Water Intake from Nand Dam"
    ],
    talentDemandTrend: "High Demand",
    description: "Covering over 2,500 hectares, Butibori is synonymous with high-scale heavy engineering, containing India's largest private defense explosives and missile propulsion manufacturer.",
    mapNodeId: "butibori-ind"
  },
  {
    id: "logistics-ecosystem",
    name: "Central Logistics & Dry Port Corridor",
    locationArea: "Wardha Road / Borkhedi / Sindi Dry Port",
    tagline: "The transit heart of India: zero-mile multi-modal freight connectivity",
    category: "Logistics",
    workforceSize: 72000,
    annualGrowth: "+24.0% YoY",
    primaryFocus: [
      "Inland Container Depot (ICD) Transshipment",
      "National E-Commerce Fulfilment Hubs",
      "Agricultural Cold Chain Preservation",
      "Cross-Dock Fleet Logistics"
    ],
    keyAnchors: [
      "CONCOR Multi-Modal Logistics Park",
      "JNPT Multi-Modal Logistics Hub Borkhedi",
      "Amazon India Central DC",
      "Adani Logistics Terminal",
      "Mahindra Logistics Hub"
    ],
    infrastructureAssets: [
      "Intersection of North-South & East-West Rail Trunk",
      "Direct connection to Samruddhi Mahamarg",
      "Automated High-Bay Pallet Warehouses",
      "Cold Storage Gas Chambers"
    ],
    talentDemandTrend: "Accelerating",
    description: "Leveraging Nagpur's unique status as India's geographical center, this corridor processes 35% of national trans-shipment freight with cutting-edge automated sorting hubs.",
    mapNodeId: "mmlp-logistics"
  },
  {
    id: "aerospace-defense-ecosystem",
    name: "Aerospace & Defence Cluster",
    locationArea: "MIHAN Aviation Zone / Butibori Defense Belt",
    tagline: "From Rafale fighter components to advanced Pinaka rocket systems",
    category: "Aerospace & Defence",
    workforceSize: 29000,
    annualGrowth: "+32.5% YoY",
    primaryFocus: [
      "Falcon 2000 & Rafale Aircraft Subassemblies",
      "Ammunition & Advanced Propellants",
      "Commercial Aircraft Airframe Overhaul",
      "UAV Drone Surveillance Systems"
    ],
    keyAnchors: [
      "Dassault Reliance Aerospace (DRAL)",
      "Solar Defense (Economic Explosives)",
      "Air India MRO (Boeing Certified)",
      "GMR Aero Technic MRO",
      "Yantra India Ltd (Ordnance Factory Ambajhari)"
    ],
    infrastructureAssets: [
      "4,000m Heavy Cargo Runway Access",
      "Explosion-Proof Secure Testing Ranges",
      "Cleanroom Class 10,000 Assembly Suites",
      "DGCA & FAA Certified Testing Labs"
    ],
    talentDemandTrend: "High Demand",
    description: "Nagpur is cementing its place as India's leading private aerospace manufacturing cluster, where French aerospace precision converges with indigenous defense capability.",
    mapNodeId: "aerospace-sez"
  },
  {
    id: "technology-saas-ecosystem",
    name: "Gayatri Nagar & Parsodi Tech Cluster",
    locationArea: "Central-South (Near VNIT)",
    tagline: "The cradle of enterprise product engineering & analytics startups",
    category: "IT & Cloud",
    workforceSize: 68000,
    annualGrowth: "+15.0% YoY",
    primaryFocus: [
      "Enterprise Business Intelligence",
      "SaaS Product Engineering",
      "Cloud Modernization & DevOps",
      "Fintech & Healthtech Applications"
    ],
    keyAnchors: [
      "Persistent Systems",
      "Infocepts Data Solutions",
      "GlobalLogic (Hitachi Group)",
      "Smart Data Systems",
      "Nagpur Angels & Startup Hub"
    ],
    infrastructureAssets: [
      "Direct physical adjacency to VNIT campus",
      "High-speed optical fiber backbone",
      "Co-working incubators (VNIT TBI, AIC-Pinacle)",
      "Pedestrian-friendly tech campus vibe"
    ],
    talentDemandTrend: "Accelerating",
    description: "Located steps away from premier engineering colleges, Gayatri Nagar IT Park acts as the innovation launchpad where homegrown engineers transition into global tech architects.",
    mapNodeId: "it-park"
  },
  {
    id: "healthcare-ecosystem",
    name: "Medical & Life Sciences Capital",
    locationArea: "Medical Square / AIIMS South Campus",
    tagline: "Tertiary medical hub catering to 25 million people across 5 states",
    category: "Healthcare",
    workforceSize: 84000,
    annualGrowth: "+13.8% YoY",
    primaryFocus: [
      "Super-Speciality Tertiary Healthcare",
      "Oncology & Organ Transplant Centers",
      "Clinical Diagnostics & Pathology",
      "Generic Pharmaceutical Formulation"
    ],
    keyAnchors: [
      "AIIMS Nagpur (960-Bed Apex Hospital)",
      "Government Medical College & Hospital",
      "National Cancer Institute (NCI Jamtha)",
      "Kingsway Hospital",
      "Lupin Pharmaceuticals (MIHAN)"
    ],
    infrastructureAssets: [
      "Apex Trauma Centers & Robotic Surgery Suites",
      "National Reference Virology & Genomics Labs",
      "Integrated Medical Hostel & Research City",
      "Air Ambulance Helipads"
    ],
    talentDemandTrend: "Steady",
    description: "Patients from Maharashtra, Madhya Pradesh, Chhattisgarh, Telangana, and Odisha converge here, driving vast requirements for clinical experts, bio-technologists, and health informatics.",
    mapNodeId: "gmc-health"
  },
  {
    id: "agritech-ecosystem",
    name: "Vidarbha Agro-Bioeconomy & Citrus Hub",
    locationArea: "East Nagpur Corridor & Rural Fringes",
    tagline: "World capital of Nagpur Mandarin oranges & cotton biotech research",
    category: "AgriTech",
    workforceSize: 45000,
    annualGrowth: "+12.1% YoY",
    primaryFocus: [
      "Citrus Value Addition & Processing",
      "Cotton Fiber & Transgenic Research",
      "Precision Drip & IoT Soil Analytics",
      "Organic Bio-Fertilizers & Pest Control"
    ],
    keyAnchors: [
      "ICAR - Central Institute for Citrus Research (CICR)",
      "Central Institute for Cotton Research (CICR Nagpur)",
      "Dr. PDKV College of Agriculture",
      "Haldiram's International Agro Unit",
      "MahaOrange Farmer Producer Federation"
    ],
    infrastructureAssets: [
      "Controlled Atmosphere Cold Storage Parks",
      "Citrus Fruit Waxing & Sorting Lines",
      "National Soil Genomics Reference Labs",
      "Samruddhi Agri-Logistics Feeder Terminals"
    ],
    talentDemandTrend: "Accelerating",
    description: "Transitioning Vidarbha's agrarian heartland into a high-value bioeconomy via precision sensors, juice concentration facilities, and climate-resilient crop genomics.",
    mapNodeId: "agritech-center"
  }
];

export const TIMELINE_2030_DATA: TimelineMilestone[] = [
  {
    year: "2026",
    theme: "Foundation & Infrastructure Interlock",
    headline: "Full Samruddhi Corridor & Metro Phase-2 Integration",
    description: "Nagpur establishes itself as India's premier multi-modal freight centroid as the Samruddhi Expressway reaches peak operational capacity and Metro Phase 2 links Butibori and Hingna directly.",
    strategicProjection: "Baseline Scenario: Industrial manufacturing output expands 14% while 25,000 fresh tech jobs activate at MIHAN SEZ.",
    keyIndicators: [
      { metric: "Tech Workforce at MIHAN", projected: "175,000 engineers" },
      { metric: "Freight Cargo Processing", projected: "4.8M Metric Tonnes" },
      { metric: "Aerospace Export Value", projected: "$420 Million USD" }
    ]
  },
  {
    year: "2028",
    theme: "Deep-Tech & Precision Defense Surge",
    headline: "Central India's High-Tech R&D & Defense Capital",
    description: "Defense aviation clusters at MIHAN and heavy missile propellants at Butibori achieve critical export mass. AI, autonomous robotics, and chip packaging labs establish regional R&D headquarters.",
    strategicProjection: "Acceleration Scenario: Local universities revamp curriculum to narrow active skill gap below 16%, fueling high-value R&D centers.",
    keyIndicators: [
      { metric: "AI & Embedded Tech Talent", projected: "75,000+ Specialists" },
      { metric: "Active Skill Gap", projected: "Reduced to 15.4%" },
      { metric: "EV Component Local Sourcing", projected: "65% from Vidarbha" }
    ]
  },
  {
    year: "2030",
    theme: "The Sustainable Continental Megapolis",
    headline: "Zero-Mile Smart Global Supply & Capability Powerhouse",
    description: "Nagpur anchors a carbon-neutral multi-modal trade super-corridor, leading national green hydrogen logistics, aircraft manufacturing, medical tourism, and distributed AI engineering.",
    strategicProjection: "Vision Scenario: Talent retention rate rises from 48% to 74%, transforming Nagpur from a talent exporter to a magnet city.",
    keyIndicators: [
      { metric: "Total Capability Talent Pool", projected: "1,250,000+" },
      { metric: "High-Skilled Job Creation", projected: "450,000 cumulative" },
      { metric: "Regional Economic Output", projected: "$45 Billion Gross Value" }
    ]
  }
];

export const CAREER_STEPS_DATA: CareerStep[] = [
  {
    stepNumber: "01",
    title: "Discover Skill",
    subtitle: "Map personal aptitude against Nagpur's live capability grid",
    description: "Identify high-leverage domains where Nagpur has distinct competitive advantages: Cloud Software, Aerospace Precision, Multi-Modal Supply Chain, EV Power Systems, or Clinical Informatics.",
    actionableInsights: [
      "Assess your baseline proficiency against industry requirements",
      "Benchmark regional demand growth vs national averages",
      "Review skill gap indices across Vidarbha industrial belts"
    ],
    localExample: "Example: Mechanical graduate pivoting toward 5-axis CNC Aerospace Precision or EV Battery Management Systems."
  },
  {
    stepNumber: "02",
    title: "Identify Demand",
    subtitle: "Pinpoint active recruitment zones across 67 city clusters",
    description: "Explore the geographic map to locate which economic zones are hiring at scale: MIHAN SEZ for cloud and aviation, Hingna for tooling, Butibori for propellants, or Sindi for automated logistics.",
    actionableInsights: [
      "Filter clusters by industry and growth score",
      "Track anchor enterprise expansions (e.g. Infosys, DRAL, Solar, Amazon)",
      "Uncover emerging MSME supplier networks with high hiring velocity"
    ],
    localExample: "Example: Identifying 68,000 open tech requisitions at MIHAN SEZ requiring AWS Cloud & Kubernetes expertise."
  },
  {
    stepNumber: "03",
    title: "Build Capability",
    subtitle: "Anchor learning through premier local institutions & incubators",
    description: "Leverage Nagpur's dense academic network—from VNIT, LIT, and IIIT to AIIMS, IIM InFED, and MSME Indo-German Tool Rooms—for hands-on certifications, micro-degrees, and lab apprenticeships.",
    actionableInsights: [
      "Enroll in collaborative industry-institute bridge programs",
      "Work on real industrial capstone projects in incubation centers",
      "Acquire sector-standard certifications (AS9100, AWS Architect, Six Sigma)"
    ],
    localExample: "Example: Taking advanced robotics tooling at MSME IGTR Hingna or Deep Learning at VNIT TBI."
  },
  {
    stepNumber: "04",
    title: "Connect with Industry",
    subtitle: "Engage directly with anchor enterprises and innovation ecosystems",
    description: "Bridge the gap between academic theory and operational excellence through hackathons, industry internships, supplier development programs, and Nagpur Tech community meetups.",
    actionableInsights: [
      "Participate in Nagpur Startups / GDG Nagpur / CII Vidarbha forums",
      "Connect with industry mentors at IIM Nagpur InFED & VNIT TBI",
      "Submit portfolios tailored to local cluster pain points"
    ],
    localExample: "Example: Presenting a warehouse IoT optimization project directly to CONCOR or Amazon logistics leads."
  },
  {
    stepNumber: "05",
    title: "Find Opportunity",
    subtitle: "Secure high-impact roles and lead Nagpur's economic transformation",
    description: "Step into high-growth roles in software engineering, aerospace fabrication, cold-chain design, or bio-analytics without having to migrate to Tier-1 congested metros.",
    actionableInsights: [
      "Enjoy 40-50% lower cost of living with competitive compensation",
      "Join fast-track leadership tracks in expanding regional headquarters",
      "Found new ventures solving central India's supply and manufacturing challenges"
    ],
    localExample: "Example: Leading an avionics assembly line at DRAL MIHAN or deploying SaaS enterprise tooling at Persistent Systems."
  }
];

export const CAREER_DOMAINS_INTERACTIVE = [
  {
    id: "cloud-dev",
    domainName: "Cloud & Enterprise Software",
    targetCluster: "MIHAN SEZ & Gayatri Nagar IT Park",
    recommendedAnchor: "VNIT / IIIT Nagpur / Persistent Academy",
    keySkillsToAcquire: ["TypeScript / Node.js", "AWS Cloud Architecture", "Kubernetes & Docker", "PostgreSQL & Redis", "System Design"],
    topHiringCompanies: ["TCS", "Infosys", "Persistent Systems", "GlobalLogic", "Infocepts"],
    averageStartingPackage: "₹6.5L - ₹14.0L / yr",
    gapReductionImpact: "High (Closes 24% local software deficit)"
  },
  {
    id: "aero-defense",
    domainName: "Aerospace Precision & Defence",
    targetCluster: "MIHAN Aviation Zone & Butibori Defense Belt",
    recommendedAnchor: "MSME Indo-German Tool Room / VNIT Mechanical",
    keySkillsToAcquire: ["AS9100 Aviation Standards", "5-Axis CNC Programming", "Composite Layup", "CATIA / Siemens NX", "GD&T"],
    topHiringCompanies: ["Dassault Reliance (DRAL)", "Solar Defense Industries", "Air India MRO", "GMR Aero", "BrahMos Feeder MSMEs"],
    averageStartingPackage: "₹5.8L - ₹12.5L / yr",
    gapReductionImpact: "Critical (Closes 39% specialized aerospace deficit)"
  },
  {
    id: "logistics-scm",
    domainName: "Smart Logistics & Supply Chain Tech",
    targetCluster: "Borkhedi MMLP & Samruddhi Logistics Node",
    recommendedAnchor: "IIM Nagpur Supply Chain Center / RTMNU Logistics",
    keySkillsToAcquire: ["Warehouse Management Systems", "Fleet IoT Telematics", "Route Optimization Analytics", "Customs Compliance", "Cold-Chain Tech"],
    topHiringCompanies: ["CONCOR Dry Port", "Amazon Fulfillment", "Adani Logistics", "DHL Global", "Mahindra Logistics"],
    averageStartingPackage: "₹5.0L - ₹11.0L / yr",
    gapReductionImpact: "High (Closes 31% freight automation deficit)"
  },
  {
    id: "ev-auto",
    domainName: "EV Power Electronics & Clean Mobility",
    targetCluster: "Hingna MIDC & Butibori Automotive Belt",
    recommendedAnchor: "YCCE EV Centre of Excellence / VNIT Electrical",
    keySkillsToAcquire: ["Battery Management Systems (BMS)", "CAN Bus Telemetry", "Motor Controller Inverters", "Thermal Simulation", "Embedded C"],
    topHiringCompanies: ["Mahindra EV Division", "KEC International", "Local E-Mobility OEMs", "Adani EV Infra"],
    averageStartingPackage: "₹5.5L - ₹13.0L / yr",
    gapReductionImpact: "Critical (Closes 38% EV engineering gap)"
  },
  {
    id: "ai-data",
    domainName: "Applied AI & Data Engineering",
    targetCluster: "Gayatri Nagar IT Park & MIHAN Software Center",
    recommendedAnchor: "IIIT Nagpur AI Lab / IIM Nagpur InFED",
    keySkillsToAcquire: ["Python & PyTorch", "Generative AI APIs & LLMOps", "Snowflake / Databricks", "Vector Databases", "Model Evaluation"],
    topHiringCompanies: ["Infosys AI Core", "Persistent Data Labs", "GlobalLogic", "Dassault AI Systems", "Local SaaS Startups"],
    averageStartingPackage: "₹7.0L - ₹16.0L / yr",
    gapReductionImpact: "Critical (Closes 34% applied AI gap)"
  },
  {
    id: "clinical-bio",
    domainName: "Clinical Informatics & Healthcare Operations",
    targetCluster: "AIIMS South Campus & Central Medical Square",
    recommendedAnchor: "AIIMS Nagpur / GMC / Datta Meghe Institute",
    keySkillsToAcquire: ["Electronic Health Records (EHR)", "Biomedical Instrumentation", "Clinical Data Compliance", "Health Informatics", "Hospital Logistics"],
    topHiringCompanies: ["AIIMS Nagpur", "Kingsway Hospitals", "Max Healthcare / Alexis", "Lupin Pharmaceuticals", "NCI Jamtha"],
    averageStartingPackage: "₹5.2L - ₹11.5L / yr",
    gapReductionImpact: "Moderate (Closes 17% healthcare delivery gap)"
  }
];
