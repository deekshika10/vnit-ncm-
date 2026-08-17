import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import L from 'leaflet';
import { 
  Compass, 
  X, 
  Sparkles,
  Users,
  Briefcase,
  AlertCircle,
  TrendingUp,
  Filter,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  GraduationCap,
  Globe,
  ArrowRight,
  ArrowLeft,
  Zap,
  RotateCw,
  Target,
  Compass as CompassIcon,
  CheckCircle2,
  Navigation,
  MapPin,
  Layers
} from 'lucide-react';
import { ClusterType, SectorCategory } from '../types';

export interface CapabilityNode {
  id: string;
  name: string;
  shortName: string;
  location: string;
  lat: number;
  lng: number;
  category: SectorCategory;
  type: ClusterType;
  typeLabel: 'Talent & IT Hub' | 'Industry Cluster' | 'Academic Anchor' | 'Growth Opportunity';
  capabilityStrength: string;
  talentCount: number;
  industryDemand: number;
  skillGap: number;
  gapDetails: string;
  skillsList: string[];
  missingSkills: string[];
  opportunity: string;
  careerPath: {
    targetRoles: string[];
    avgStartingSalary: string;
    bridgingInstitution: string;
    pathwayDescription: string;
  };
  connectedNodes: string[]; // IDs of related capability nodes
}

// Strategic Nagpur Capability Nodes with real geographic coordinates
export const PROTOTYPE_CAPABILITY_NODES: CapabilityNode[] = [
  {
    id: 'mihan',
    name: 'MIHAN SEZ & Tech Corridor',
    shortName: 'MIHAN SEZ',
    location: 'South Wardha Road Corridor / SEZ',
    lat: 21.0550,
    lng: 79.0520,
    category: 'IT & Cloud',
    type: 'industry_cluster',
    typeLabel: 'Industry Cluster',
    capabilityStrength: 'Tier-1 Hub (94%)',
    talentCount: 142000,
    industryDemand: 68000,
    skillGap: 18,
    gapDetails: 'Shortage in Cloud Native architecture, Enterprise Kubernetes, and FAA-standard Avionics MRO testing.',
    skillsList: ['Aerospace Avionics MRO', 'Cloud Native Architecture', 'Enterprise AI Pipelines', 'AS9100 Quality Engineering'],
    missingSkills: ['Cloud Infrastructure', 'Avionics MRO', 'Full-stack AI', 'AS9100 Quality'],
    opportunity: 'Build advanced aerospace, Boeing/Air India MRO hangars, and high-volume global IT delivery capability around existing talent.',
    careerPath: {
      targetRoles: ['Avionics Systems Engineer', 'Cloud Solutions Architect', 'MRO Technical Specialist', 'AI Pipeline Engineer'],
      avgStartingSalary: '₹8.5L – ₹18.0L',
      bridgingInstitution: 'VNIT + TCS/Boeing Apprenticeship Corridor',
      pathwayDescription: 'B.Tech/MCA → Cloud Certification & MRO Simulators → MIHAN SEZ Tech Lead'
    },
    connectedNodes: ['butibori', 'vnit', 'health-corridor', 'central-logistics', 'it-park'],
  },
  {
    id: 'hingna',
    name: 'Hingna Industrial Zone (MIDC)',
    shortName: 'Hingna MIDC',
    location: 'West Industrial Belt / MIDC Zone',
    lat: 21.0950,
    lng: 78.9800,
    category: 'Manufacturing',
    type: 'industry_cluster',
    typeLabel: 'Industry Cluster',
    capabilityStrength: 'Established (82%)',
    talentCount: 88000,
    industryDemand: 26500,
    skillGap: 24,
    gapDetails: 'Transition lag from manual tooling to CNC Multi-Axis machining and IoT sensorized foundry casting.',
    skillsList: ['Precision CNC Machining', 'Tool & Die Fabrication', 'Industrial IoT Telemetry', 'Foundry Metallurgy'],
    missingSkills: ['5-Axis CNC Machining', 'Industrial IoT', 'Foundry Metallurgy', 'PLC Automation'],
    opportunity: 'Modernize traditional toolrooms into high-precision defense munitions and specialized automotive fabrication centers.',
    careerPath: {
      targetRoles: ['Precision CNC Programmer', 'Automation Controls Lead', 'Quality Metrology Specialist', 'Plant Operations Mgr'],
      avgStartingSalary: '₹5.5L – ₹12.5L',
      bridgingInstitution: 'Government Polytechnic + MIDC Tool Room (IGTR)',
      pathwayDescription: 'Diploma/BE Mech → IGTR Advanced Tooling → MIDC Precision Foundry Lead'
    },
    connectedNodes: ['vnit', 'butibori', 'agritech-zone', 'wadi'],
  },
  {
    id: 'butibori',
    name: 'Butibori Mega Industrial Estate',
    shortName: 'Butibori Heavy Hub',
    location: 'South NH-44 Heavy Industrial Corridor',
    lat: 20.9250,
    lng: 78.9950,
    category: 'EV & Mobility',
    type: 'industry_cluster',
    typeLabel: 'Industry Cluster',
    capabilityStrength: 'Expanding (88%)',
    talentCount: 125000,
    industryDemand: 42000,
    skillGap: 26,
    gapDetails: 'Deficit in EV Battery Thermal Management, High-Voltage BMS calibration, and automated battery welding.',
    skillsList: ['EV Powertrain Integration', 'High-Voltage BMS Safety', 'Automated Laser Welding', 'Heavy Metal Fabrication'],
    missingSkills: ['BMS Engineering', 'Battery Cell Chemistry', 'High-Voltage Safety', 'Robotic Assembly'],
    opportunity: 'Scale South Asia’s largest industrial estate into a premier EV gigafactory and heavy mobility battery hub.',
    careerPath: {
      targetRoles: ['EV Powertrain Engineer', 'BMS Firmware Engineer', 'Battery Cell Testing Lead', 'Industrial Robotics Spec'],
      avgStartingSalary: '₹6.5L – ₹15.0L',
      bridgingInstitution: 'VNIT Center of Excellence for E-Mobility + Mahindra Hub',
      pathwayDescription: 'BE Electrical/Mech → EV Power Electronics Fast-Track → Butibori Gigafactory'
    },
    connectedNodes: ['mihan', 'hingna', 'central-logistics'],
  },
  {
    id: 'zero-mile',
    name: 'Zero Mile Civic & Knowledge Core',
    shortName: 'Zero Mile Core',
    location: 'Central Nagpur / Civil Lines & Secretariat',
    lat: 21.1458,
    lng: 79.0882,
    category: 'Education & Research',
    type: 'academic_anchor',
    typeLabel: 'Academic Anchor',
    capabilityStrength: 'Civic Core (86%)',
    talentCount: 94000,
    industryDemand: 28500,
    skillGap: 14,
    gapDetails: 'Lack of urban GIS spatial modeling and digital twin governance integration for municipal projects.',
    skillsList: ['Geospatial GIS Modeling', 'Urban Digital Twin Systems', 'Public Policy Analytics', 'Remote Sensing Satellite Data'],
    missingSkills: ['Geospatial GIS Modeling', 'Urban Digital Twin', 'Civic Policy Analysis', 'Smart City Data Analytics'],
    opportunity: 'Leverage India’s geographic centroid for national geospatial data infrastructure, defense surveying, and civic policy innovation.',
    careerPath: {
      targetRoles: ['GIS Spatial Analyst', 'Urban Informatics Specialist', 'Public Policy Fellow', 'Geodetic Survey Lead'],
      avgStartingSalary: '₹6.0L – ₹14.0L',
      bridgingInstitution: 'Survey of India / RRSC Central + RTMNU',
      pathwayDescription: 'Earth Sciences/CS → GIS Remote Sensing Fellowship → Zero Mile Smart Governance'
    },
    connectedNodes: ['vnit', 'health-corridor', 'central-logistics', 'agritech-zone', 'sadar-sitabuldi'],
  },
  {
    id: 'vnit',
    name: 'VNIT Academic & Deep Tech Cluster',
    shortName: 'VNIT & LIT Hub',
    location: 'South Ambazari / Bajaj Nagar Axis',
    lat: 21.1255,
    lng: 79.0515,
    category: 'IT & Cloud',
    type: 'academic_anchor',
    typeLabel: 'Academic Anchor',
    capabilityStrength: 'Premier (92%)',
    talentCount: 118000,
    industryDemand: 34000,
    skillGap: 16,
    gapDetails: 'Need for applied semiconductor tape-out experience and proprietary LLM model fine-tuning frameworks.',
    skillsList: ['VLSI Circuit Design', 'Applied Deep Learning', 'Edge AI Embedded Systems', 'Quantum Hardware Computing'],
    missingSkills: ['VLSI Semiconductor Design', 'Applied Deep Learning', 'Edge AI Deployment', 'Quantum Computing Basics'],
    opportunity: 'Establish Central India’s premier semiconductor research corridor, incubation fab labs, and deep-tech venture pipeline.',
    careerPath: {
      targetRoles: ['Semiconductor Design Engineer', 'AI Research Scientist', 'Embedded Systems Architect', 'Deep Tech Founder'],
      avgStartingSalary: '₹12.0L – ₹24.0L',
      bridgingInstitution: 'VNIT Siemens Center of Excellence + IIIT Nagpur',
      pathwayDescription: 'B.Tech/M.Tech → VLSI/AI Incubation Lab → Semiconductor Global R&D'
    },
    connectedNodes: ['zero-mile', 'mihan', 'hingna', 'health-corridor', 'it-park'],
  },
  {
    id: 'it-park',
    name: 'Gayatri Nagar IT Park & SaaS Corridor',
    shortName: 'IT Park Corridor',
    location: 'Parsodi / Gayatri Nagar Axis',
    lat: 21.1220,
    lng: 79.0610,
    category: 'IT & Cloud',
    type: 'talent_hub',
    typeLabel: 'Talent & IT Hub',
    capabilityStrength: 'Active Hub (90%)',
    talentCount: 68000,
    industryDemand: 29000,
    skillGap: 21,
    gapDetails: 'Need for specialized full-stack AI engineers, high-concurrency microservices, and distributed data systems.',
    skillsList: ['Enterprise SaaS Architecture', 'React/Next.js Ecosystem', 'Python / GenAI Pipelines', 'DevOps & Kubernetes'],
    missingSkills: ['Kubernetes Cluster Ops', 'LLMOps & RAG Architecture', 'Data Engineering', 'Zero-Trust Security'],
    opportunity: 'Consolidate central India’s fastest-growing enterprise SaaS cluster and tech startup incubator ecosystem.',
    careerPath: {
      targetRoles: ['Lead Full-Stack Engineer', 'SaaS Product Manager', 'DevOps Specialist', 'Data Engineer'],
      avgStartingSalary: '₹7.5L – ₹16.0L',
      bridgingInstitution: 'Persistent Systems Center of Excellence + VNIT TBI',
      pathwayDescription: 'B.Tech/MCA → SaaS Apprenticeship → IT Park Tech Lead'
    },
    connectedNodes: ['vnit', 'mihan', 'zero-mile', 'hingna'],
  },
  {
    id: 'central-logistics',
    name: 'Multimodal Freight & Inland Port (MMLP)',
    shortName: 'Logistics Port (MMLP)',
    location: 'Borkhedi-Sindi Axis & Samruddhi Junction',
    lat: 21.0200,
    lng: 79.1200,
    category: 'Logistics',
    type: 'growth_opportunity',
    typeLabel: 'Growth Opportunity',
    capabilityStrength: 'Velocity Hub (85%)',
    talentCount: 72000,
    industryDemand: 39000,
    skillGap: 20,
    gapDetails: 'Absence of Automated Guided Vehicle (AGV) warehouse dispatchers and automated cold chain temperature telemetry.',
    skillsList: ['Automated WMS Logistics', 'Cold Chain Telemetry', 'Intermodal Freight Operations', 'Predictive Supply Routing'],
    missingSkills: ['Automated Warehouse WMS', 'Cold Chain Telemetry', 'Intermodal Freight Routing', 'Predictive Logistics AI'],
    opportunity: 'Connect Samruddhi Expressway and National Highway grids into India’s primary multimodal inland container dry port.',
    careerPath: {
      targetRoles: ['Intermodal Supply Chain Director', 'Cold Chain Ops Specialist', 'Automated Warehouse Mgr', 'Customs Freight Lead'],
      avgStartingSalary: '₹6.0L – ₹14.5L',
      bridgingInstitution: 'CONCOR Inland Freight Training + IIM Nagpur Logistics Cell',
      pathwayDescription: 'BBA/B.Tech → Logistics AI Certification → Borkhedi Dry Port Ops'
    },
    connectedNodes: ['mihan', 'butibori', 'zero-mile', 'wadi'],
  },
  {
    id: 'health-corridor',
    name: 'AIIMS & GMC Healthcare Grid',
    shortName: 'Healthcare Grid',
    location: 'Medical Square & MIHAN AIIMS Campus',
    lat: 21.1340,
    lng: 79.0960,
    category: 'Healthcare',
    type: 'talent_hub',
    typeLabel: 'Talent & IT Hub',
    capabilityStrength: 'Specialized (89%)',
    talentCount: 48000,
    industryDemand: 22000,
    skillGap: 15,
    gapDetails: 'Shortfall in Biomedical Instrumentation calibration, robotic surgical maintenance, and clinical genomic sequencing.',
    skillsList: ['Biomedical Engineering', 'Clinical Trial Analytics', 'Robotic Surgical Assistance', 'Hospital Informatics'],
    missingSkills: ['Biomedical Device Calibration', 'Clinical Data Genomics', 'Robotic Surgery Tech', 'Health Informatics'],
    opportunity: 'Create Central India’s medical tourism and clinical trials apex, bridging research hospitals with med-tech manufacturing.',
    careerPath: {
      targetRoles: ['Biomedical Device Engineer', 'Clinical Trial Data Manager', 'Health Informatics Specialist', 'Surgical Robotic Tech'],
      avgStartingSalary: '₹7.0L – ₹16.0L',
      bridgingInstitution: 'AIIMS Nagpur Biomedical Division + GMC Clinical Labs',
      pathwayDescription: 'MBBS/BioMed Engg → Healthcare Analytics Residency → Apex Medical Core'
    },
    connectedNodes: ['mihan', 'vnit', 'zero-mile', 'sadar-sitabuldi'],
  },
  {
    id: 'agritech-zone',
    name: 'Central Agri-Biotech Corridor',
    shortName: 'AgriTech Corridor',
    location: 'North-West Corridor / CICR & Panjabrao Krishi',
    lat: 21.1800,
    lng: 79.0400,
    category: 'AgriTech',
    type: 'growth_opportunity',
    typeLabel: 'Growth Opportunity',
    capabilityStrength: 'Emerging (76%)',
    talentCount: 35000,
    industryDemand: 16000,
    skillGap: 22,
    gapDetails: 'Dearth of certified agri-drone payload operators and soil microbiome gene-sequencing bio-informaticians.',
    skillsList: ['Precision Agriculture Drones', 'Soil Microbiome Bio-Tech', 'Citrus Processing Technology', 'Supply Chain Traceability'],
    missingSkills: ['Agri-Drone DGCA Pilots', 'Microbiome Bio-Informatics', 'Enzymatic Processing', 'Cold-Chain IoT'],
    opportunity: 'Transform Vidarbha’s cotton and orange belt into a high-value bio-economy, precision agri-drone, and food export nexus.',
    careerPath: {
      targetRoles: ['Precision Agri Tech Lead', 'Bio-Informatics Scientist', 'Food Processing Director', 'Agri-Supply Logistics Lead'],
      avgStartingSalary: '₹5.5L – ₹13.0L',
      bridgingInstitution: 'Central Institute for Cotton Research (CICR) + PDKV',
      pathwayDescription: 'B.Sc Agri/Biotech → Precision Ag Drone Academy → AgriTech Enterprise Lead'
    },
    connectedNodes: ['zero-mile', 'hingna', 'wadi'],
  },
  {
    id: 'wadi',
    name: 'Wadi Logistics & Freight Corridor',
    shortName: 'Wadi Freight Hub',
    location: 'West Corridor / NH-53 Amravati Road',
    lat: 21.1500,
    lng: 78.9980,
    category: 'Logistics',
    type: 'growth_opportunity',
    typeLabel: 'Growth Opportunity',
    capabilityStrength: 'High Velocity (84%)',
    talentCount: 42000,
    industryDemand: 21000,
    skillGap: 23,
    gapDetails: 'Shortage in digital fleet telematics, automated inventory dispatch, and express cargo handling.',
    skillsList: ['Fleet Management Telematics', 'Heavy Cargo Transshipment', 'Automated Warehouse Dispatch', 'Express Distribution'],
    missingSkills: ['Fleet Telematics', 'Cross-Docking Optimization', 'Warehouse Robotics', 'Cold Storage Logistics'],
    opportunity: 'Upgrade West Nagpur freight corridor into an intelligent inter-state transit and distribution hub.',
    careerPath: {
      targetRoles: ['Fleet Operations Manager', 'Logistics Dispatch Lead', 'Warehouse Ops Supervisor', 'Freight Optimization Analyst'],
      avgStartingSalary: '₹5.0L – ₹11.5L',
      bridgingInstitution: 'National Institute of Logistics + MIDC Training Cell',
      pathwayDescription: 'B.Com/BBA → Logistics Telematics Diploma → Wadi Cargo Distribution Head'
    },
    connectedNodes: ['hingna', 'central-logistics', 'agritech-zone', 'zero-mile'],
  },
  {
    id: 'sadar-sitabuldi',
    name: 'Sadar & Sitabuldi Commercial & Talent Hub',
    shortName: 'Sadar / Sitabuldi',
    location: 'Central Nagpur Transit & Retail Core',
    lat: 21.1520,
    lng: 79.0845,
    category: 'Education & Research',
    type: 'talent_hub',
    typeLabel: 'Talent & IT Hub',
    capabilityStrength: 'Commercial Nexus (87%)',
    talentCount: 65000,
    industryDemand: 24000,
    skillGap: 17,
    gapDetails: 'Transitioning from legacy retail & banking to digital fintech, UI/UX creative agencies, and transit-oriented services.',
    skillsList: ['Financial Technology (FinTech)', 'Digital Commerce Systems', 'Urban Transit Mobility', 'Creative Media & UI/UX'],
    missingSkills: ['Fintech API Integration', 'Product Design (UI/UX)', 'Digital Marketing Analytics', 'Payment Gateway Ops'],
    opportunity: 'Create a dense urban creative economy and fintech cluster anchored around Sitabuldi Interchange Metro station.',
    careerPath: {
      targetRoles: ['Fintech Product Specialist', 'UI/UX Design Lead', 'Digital Marketing Director', 'Commercial Operations Lead'],
      avgStartingSalary: '₹6.0L – ₹14.0L',
      bridgingInstitution: 'RTMNU Commerce Faculty + Nagpur Design Hub',
      pathwayDescription: 'BBA/B.Des → Digital Product Design Fellowship → Commercial Agency Lead'
    },
    connectedNodes: ['zero-mile', 'health-corridor', 'vnit', 'it-park'],
  }
];

// Strategic Capability Inter-Connections (Talent → Skills → Industry → Opportunity)
export const NETWORK_CORRIDORS: Array<{
  from: string;
  to: string;
  label: string;
  relationshipType: 'Talent Flow' | 'Industrial Demand' | 'Research Synergy' | 'Logistics Corridor';
}> = [
  { from: 'vnit', to: 'mihan', label: 'VNIT → MIHAN DeepTech & Aerospace Pipeline', relationshipType: 'Talent Flow' },
  { from: 'vnit', to: 'it-park', label: 'VNIT → IT Park SaaS Incubation Corridor', relationshipType: 'Research Synergy' },
  { from: 'it-park', to: 'mihan', label: 'IT Park → MIHAN Enterprise Cloud Scaling', relationshipType: 'Talent Flow' },
  { from: 'hingna', to: 'butibori', label: 'Hingna → Butibori Heavy EV Supply Chain', relationshipType: 'Industrial Demand' },
  { from: 'mihan', to: 'butibori', label: 'MIHAN → Butibori High-Tech Precision Axis', relationshipType: 'Industrial Demand' },
  { from: 'zero-mile', to: 'vnit', label: 'Zero Mile → VNIT Civic AI & Data Axis', relationshipType: 'Research Synergy' },
  { from: 'zero-mile', to: 'sadar-sitabuldi', label: 'Zero Mile → Sadar Commercial Spine', relationshipType: 'Talent Flow' },
  { from: 'health-corridor', to: 'mihan', label: 'AIIMS → MIHAN HealthTech & BioMed Hub', relationshipType: 'Research Synergy' },
  { from: 'mihan', to: 'central-logistics', label: 'MIHAN Cargo → Borkhedi Inland Dry Port', relationshipType: 'Logistics Corridor' },
  { from: 'butibori', to: 'central-logistics', label: 'Butibori Heavy → MMLP National Freight', relationshipType: 'Logistics Corridor' },
  { from: 'hingna', to: 'wadi', label: 'Hingna MIDC → Wadi Western Freight Link', relationshipType: 'Logistics Corridor' },
  { from: 'agritech-zone', to: 'zero-mile', label: 'CICR Agri-Bio → Zero Mile Research', relationshipType: 'Research Synergy' },
  { from: 'agritech-zone', to: 'wadi', label: 'CICR Agri → Wadi Cold Distribution', relationshipType: 'Logistics Corridor' },
];

// 5 "WHAT IF NAGPUR...?" Scenarios
export interface WhatIfScenario {
  id: string;
  title: string;
  subtitle: string;
  category: SectorCategory;
  primaryNodeId: string;
  supportingNodeIds: string[];
  icon: string;
  talentCount: number;
  demandCount: number;
  gapPercent: number;
  keySkills: string[];
  missingSkills: string[];
  spatialAnchor: string;
  stage01TalentQuote: string;
  stage02SkillsQuote: string;
  stage03GapQuote: string;
  stage04DemandQuote: string;
  stage05OpportunityQuote: string;
  finalConclusion: string;
}

export const WHAT_IF_SCENARIOS: WhatIfScenario[] = [
  {
    id: 'aerospace',
    title: 'AEROSPACE & DEFENCE',
    subtitle: 'What if Nagpur becomes India’s primary Aerospace MRO & Defence manufacturing hub?',
    category: 'Aerospace & Defence',
    primaryNodeId: 'mihan',
    supportingNodeIds: ['butibori', 'vnit', 'hingna'],
    icon: '✈️',
    talentCount: 142000,
    demandCount: 68000,
    gapPercent: 18,
    keySkills: ['Avionics MRO Systems', 'AS9100 Quality Engineering', 'Titanium Precision Machining', 'Airframe Structural Assembly'],
    missingSkills: ['FAA/DGCA MRO Certification', 'Composite Material Testing', 'Precision Turbine Tooling'],
    spatialAnchor: 'MIHAN SEZ Aviation Corridor (Boeing / Air India MRO)',
    stage01TalentQuote: "Nagpur graduates over 14,000 mechanical and aeronautical engineers annually, creating a deep base of precision engineering capability.",
    stage02SkillsQuote: "Core competencies in structural assembly, CAD/CAM design, and aerospace quality standards form the foundation.",
    stage03GapQuote: "However, a critical 18% gap persists in certified FAA/DGCA avionics testing, composite airframe repair, and defense ordinance testing.",
    stage04DemandQuote: "Global airlines and defense primes forecast 68,000+ technical jobs in India’s central MRO hub over the next 36 months.",
    stage05OpportunityQuote: "By bridging the MRO avionics deficit, Nagpur can capture up to 45% of South Asia's commercial fleet overhaul demand at MIHAN.",
    finalConclusion: "Nagpur’s Zero-Mile centroid gives airlines minimal ferry time from any Indian metro, turning MIHAN into a national aerospace maintenance capital."
  },
  {
    id: 'ev-mobility',
    title: 'EV & MOBILITY',
    subtitle: 'What if Butibori & Hingna form Central India’s premier EV Battery & Gigafactory cluster?',
    category: 'EV & Mobility',
    primaryNodeId: 'butibori',
    supportingNodeIds: ['hingna', 'vnit', 'central-logistics'],
    icon: '⚡',
    talentCount: 125000,
    demandCount: 42000,
    gapPercent: 26,
    keySkills: ['High-Voltage BMS Safety', 'Lithium Cell Chemistry', 'Automated Laser Pack Welding', 'Powertrain Calibration'],
    missingSkills: ['Battery Thermal Simulation', 'Power Electronics Firmware', 'Automated Battery Recycling'],
    spatialAnchor: 'Butibori Industrial Area (NH-44 Corridor)',
    stage01TalentQuote: "With 125,000 industrial technicians across Butibori and Hingna, Nagpur hosts one of South Asia’s largest automotive fabrication workforces.",
    stage02SkillsQuote: "Traditional chassis welding, drivetrain stamping, and electrical harness fabrication provide an immediate manufacturing foundation.",
    stage03GapQuote: "A 26% capability gap exists in Battery Management System (BMS) firmware, high-voltage thermal safety, and automated cell packaging.",
    stage04DemandQuote: "EV two-wheeler and commercial truck makers are commissioning 42,000 specialized high-voltage assembly roles.",
    stage05OpportunityQuote: "VNIT’s E-Mobility Center of Excellence combined with Butibori land scale can position Nagpur as India’s central Gigafactory basin.",
    finalConclusion: "Direct access to raw materials and rapid transit via Samruddhi Expressway allows Butibori to supply EV batteries to Mumbai, Pune, and Delhi in 12 hours."
  },
  {
    id: 'technology',
    title: 'ENTERPRISE AI & CLOUD',
    subtitle: 'What if VNIT, IT Park, and MIHAN establish Nagpur as a Tier-2 Deep Tech & AI capital?',
    category: 'IT & Cloud',
    primaryNodeId: 'it-park',
    supportingNodeIds: ['vnit', 'mihan', 'zero-mile'],
    icon: '💻',
    talentCount: 118000,
    demandCount: 34000,
    gapPercent: 16,
    keySkills: ['Distributed Cloud Architecture', 'Kubernetes Cluster Ops', 'Applied LLM Fine-Tuning', 'Edge AI Embedded Systems'],
    missingSkills: ['Semiconductor Tape-Out', 'VLSI Verification', 'Quantum Algorithm Design'],
    spatialAnchor: 'Gayatri Nagar IT Park & VNIT Deep Tech Corridor',
    stage01TalentQuote: "Over 118,000 computer science, data, and software engineers reside across Nagpur’s tech corridor.",
    stage02SkillsQuote: "Solid proficiency in enterprise React, Python microservices, database architecture, and DevOps pipelines.",
    stage03GapQuote: "A 16% gap in specialized generative AI pipeline optimization, VLSI chip design, and hardware-accelerated model deployment.",
    stage04DemandQuote: "Global tech enterprises and SaaS scale-ups have posted 34,000 active remote and hybrid engineering requisitions for Nagpur.",
    stage05OpportunityQuote: "Nagpur’s 40% lower cost-of-living relative to Bengaluru makes it the premier hub for sustainable Tier-2 deep-tech R&D campuses.",
    finalConclusion: "Reverse migration of senior architects from Pune and Hyderabad is transforming Gayatri Nagar IT Park into a high-retention engineering powerhouse."
  },
  {
    id: 'healthcare',
    title: 'HEALTHCARE & MEDTECH',
    subtitle: 'What if AIIMS and GMC transform Nagpur into Central India’s medical tourism & clinical genomics apex?',
    category: 'Healthcare',
    primaryNodeId: 'health-corridor',
    supportingNodeIds: ['mihan', 'vnit', 'zero-mile'],
    icon: '🏥',
    talentCount: 48000,
    demandCount: 22000,
    gapPercent: 15,
    keySkills: ['Clinical Genomic Sequencing', 'Robotic Surgical Assistance', 'Biomedical Telemetry', 'Hospital Information Systems'],
    missingSkills: ['Medical Device Calibration', 'Clinical Data Privacy Compliance', 'AI Radiology Diagnostics'],
    spatialAnchor: 'Medical Square & MIHAN AIIMS Super-Specialty Campus',
    stage01TalentQuote: "48,000 healthcare practitioners, surgeons, biomedical technicians, and nursing specialists anchor Nagpur’s medical institutions.",
    stage02SkillsQuote: "Renowned clinical diagnostics, emergency trauma response, and surgical care across AIIMS, GMC, and private super-specialty hospitals.",
    stage03GapQuote: "A 15% deficit in biomedical equipment engineering, robotic maintenance, and electronic health record AI informatics.",
    stage04DemandQuote: "Regional healthcare networks from 5 surrounding states funnel over 22,000 high-complexity clinical procedures monthly.",
    stage05OpportunityQuote: "Pairing AIIMS clinical research with MIHAN medical device manufacturing creates an integrated med-tech valley in Central India.",
    finalConclusion: "Patients from Madhya Pradesh, Chhattisgarh, and Telangana travel to Nagpur as their closest premier medical sanctuary."
  },
  {
    id: 'agritech',
    title: 'AGRITECH & BIO-ECONOMY',
    subtitle: 'What if Vidarbha’s cotton and citrus belt scales into an automated precision bio-economy?',
    category: 'AgriTech',
    primaryNodeId: 'agritech-zone',
    supportingNodeIds: ['hingna', 'wadi', 'zero-mile', 'central-logistics'],
    icon: '🌱',
    talentCount: 35000,
    demandCount: 16000,
    gapPercent: 22,
    keySkills: ['Agri-Drone Payload Operations', 'Soil Microbiome Genomics', 'Citrus Processing Automation', 'Cold-Chain IoT Telemetry'],
    missingSkills: ['Precision Drone Certification', 'Bio-Enzymatic Extraction', 'Export Cold Storage Protocols'],
    spatialAnchor: 'Central Institute for Cotton Research (CICR) & Panjabrao Krishi Belt',
    stage01TalentQuote: "35,000 agricultural researchers, agronomists, and biotechnology graduates form the foundation of Vidarbha's farm research institutes.",
    stage02SkillsQuote: "Deep expertise in cotton hybrid breeding, citrus pathology, and dryland irrigation management.",
    stage03GapQuote: "A 22% gap in deploying autonomous drone spraying, satellite moisture telemetry, and value-added pectin extraction.",
    stage04DemandQuote: "Export food processors and organic FMCG brands are seeking 16,000 modern agri-supply chain specialists.",
    stage05OpportunityQuote: "Connecting farm-gate IoT with the Samruddhi Expressway allows fresh Nagpur oranges to reach Mumbai container ports in 8 hours.",
    finalConclusion: "Nagpur can shift from a raw commodity origin to a high-value bio-tech agricultural export capital for Southeast Asia and the Middle East."
  }
];

// Color configuration for categories
const CATEGORY_COLORS: Record<SectorCategory, { fill: string; stroke: string; glow: string; text: string; bgLight: string; border: string }> = {
  'IT & Cloud': { fill: '#2878A8', stroke: '#1F5F85', glow: 'rgba(40, 120, 168, 0.4)', text: '#1F5F85', bgLight: '#EBF3F8', border: '#BBD5E6' },
  'Manufacturing': { fill: '#E58A32', stroke: '#C46E1E', glow: 'rgba(229, 138, 50, 0.4)', text: '#C46E1E', bgLight: '#FCF3EA', border: '#F7D5B0' },
  'Logistics': { fill: '#3C9270', stroke: '#2E7358', glow: 'rgba(60, 146, 112, 0.4)', text: '#2E7358', bgLight: '#EEF7F2', border: '#B2DEC9' },
  'Education & Research': { fill: '#7467A8', stroke: '#5A4E8C', glow: 'rgba(116, 103, 168, 0.4)', text: '#5A4E8C', bgLight: '#F3F1F8', border: '#CFCAE4' },
  'Healthcare': { fill: '#7467A8', stroke: '#5A4E8C', glow: 'rgba(116, 103, 168, 0.4)', text: '#5A4E8C', bgLight: '#F3F1F8', border: '#CFCAE4' },
  'EV & Mobility': { fill: '#E58A32', stroke: '#C46E1E', glow: 'rgba(229, 138, 50, 0.4)', text: '#C46E1E', bgLight: '#FCF3EA', border: '#F7D5B0' },
  'Aerospace & Defence': { fill: '#2878A8', stroke: '#1F5F85', glow: 'rgba(40, 120, 168, 0.4)', text: '#1F5F85', bgLight: '#EBF3F8', border: '#BBD5E6' },
  'AgriTech': { fill: '#3C9270', stroke: '#2E7358', glow: 'rgba(60, 146, 112, 0.4)', text: '#2E7358', bgLight: '#EEF7F2', border: '#B2DEC9' },
  'Engineering': { fill: '#E58A32', stroke: '#C46E1E', glow: 'rgba(229, 138, 50, 0.4)', text: '#C46E1E', bgLight: '#FCF3EA', border: '#F7D5B0' },
};

// Default map center and bounds for Nagpur metropolitan region
const NAGPUR_CENTER: [number, number] = [21.1150, 79.0550];
const NAGPUR_DEFAULT_ZOOM = 11.5;

interface HeroMapProps {
  selectedSector: SectorCategory | 'All';
  selectedType: ClusterType | 'All';
  selectedNodeId: string | null;
  onSelectNode: (nodeId: string | null) => void;
}

export const HeroMap: React.FC<HeroMapProps> = ({
  selectedSector,
  selectedType,
  selectedNodeId,
  onSelectNode
}) => {
  // Leaflet Map state & references
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());
  const svgOverlayRef = useRef<SVGSVGElement | null>(null);

  // Active interaction states
  const [selectedCapability, setSelectedCapability] = useState<CapabilityNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<CapabilityNode | null>(null);
  const [hoveredCorridor, setHoveredCorridor] = useState<typeof NETWORK_CORRIDORS[0] | null>(null);
  const [isMapCustomized, setIsMapCustomized] = useState(false);
  const [isMacroView, setIsMacroView] = useState(false);
  const [isDiscovering, setIsDiscovering] = useState(false);

  // "What If Nagpur?" State
  const [isWhatIfOpen, setIsWhatIfOpen] = useState(false);
  const [selectedWhatIf, setSelectedWhatIf] = useState<WhatIfScenario | null>(null);
  const [hoveredWhatIfChoice, setHoveredWhatIfChoice] = useState<WhatIfScenario | null>(null);
  const [whatIfVisibleStage, setWhatIfVisibleStage] = useState<number>(1);

  // "Capability Flow" State
  const [isCapabilityFlowActive, setIsCapabilityFlowActive] = useState(false);
  const [expandedFlowStage, setExpandedFlowStage] = useState<'talent' | 'skills' | 'gap' | 'demand' | 'opportunity' | null>(null);
  const [flowVisibleStage, setFlowVisibleStage] = useState<number>(1);

  // Staged Network Reveal State
  const [networkRevealStage, setNetworkRevealStage] = useState<number>(0);

  // Map view sync counter to force SVG redraw on move/zoom
  const [, setMapUpdateTick] = useState(0);

  // Synchronize external selectedNodeId prop
  useEffect(() => {
    if (selectedNodeId) {
      const node = PROTOTYPE_CAPABILITY_NODES.find(n => n.id === selectedNodeId);
      if (node && (!selectedCapability || selectedCapability.id !== node.id)) {
        setSelectedCapability(node);
        if (mapInstanceRef.current) {
          mapInstanceRef.current.flyTo([node.lat, node.lng], 13.5, { duration: 1.2 });
          setIsMapCustomized(true);
        }
      }
    } else if (selectedNodeId === null && selectedCapability) {
      setSelectedCapability(null);
    }
  }, [selectedNodeId]);

  // Progressive timer for Staged Network Reveal
  useEffect(() => {
    if (selectedCapability && !isWhatIfOpen && !isCapabilityFlowActive) {
      setNetworkRevealStage(0);
      const interval = setInterval(() => {
        setNetworkRevealStage(prev => {
          if (prev < 4) return prev + 1;
          clearInterval(interval);
          return prev;
        });
      }, 350);
      return () => clearInterval(interval);
    }
  }, [selectedCapability, isWhatIfOpen, isCapabilityFlowActive]);

  // Capability Flow progressive animation timer
  useEffect(() => {
    if (isCapabilityFlowActive && selectedCapability) {
      setFlowVisibleStage(1);
      const interval = setInterval(() => {
        setFlowVisibleStage(prev => {
          if (prev < 5) return prev + 1;
          clearInterval(interval);
          return prev;
        });
      }, 300);
      return () => clearInterval(interval);
    }
  }, [isCapabilityFlowActive, selectedCapability]);

  // Initialize Real Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Create Leaflet instance
    const map = L.map(mapContainerRef.current, {
      center: NAGPUR_CENTER,
      zoom: NAGPUR_DEFAULT_ZOOM,
      minZoom: 10,
      maxZoom: 16,
      zoomControl: false,
      attributionControl: true,
      scrollWheelZoom: true,
      fadeAnimation: true
    });

    // Add CartoDB Voyager Tile Layer (Real Geographic Map: Warm, Light Neutral, Visible Highways/Yellow routes, Lakes, Locality Labels)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map);

    // Map move/zoom listeners to trigger SVG recalculation
    const handleMapMove = () => {
      setMapUpdateTick(t => t + 1);
    };

    map.on('move', handleMapMove);
    map.on('zoom', handleMapMove);
    map.on('resize', handleMapMove);

    mapInstanceRef.current = map;

    return () => {
      map.off('move', handleMapMove);
      map.off('zoom', handleMapMove);
      map.off('resize', handleMapMove);
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Markers whenever filters or selection change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing markers
    markersRef.current.forEach(m => m.remove());
    markersRef.current.clear();

    PROTOTYPE_CAPABILITY_NODES.forEach((node, nodeIdx) => {
      const isSelected = selectedCapability?.id === node.id;
      const isHovered = hoveredNode?.id === node.id;
      const colors = CATEGORY_COLORS[node.category];

      const matchesLayerFilter = selectedType === 'All' || node.type === selectedType;
      const matchesSectorFilter = selectedSector === 'All' || node.category === selectedSector;

      // What-if active checks
      const activeWhatIfTarget = selectedWhatIf || hoveredWhatIfChoice;
      const isWhatIfPrimary = activeWhatIfTarget?.primaryNodeId === node.id;
      const isWhatIfSupporting = activeWhatIfTarget?.supportingNodeIds.includes(node.id) ?? false;
      const isWhatIfRelevant = isWhatIfPrimary || isWhatIfSupporting;

      const isConnectedToHovered = hoveredNode
        ? hoveredNode.connectedNodes.includes(node.id) || hoveredNode.id === node.id
        : false;

      const isConnectedToSelected = selectedCapability
        ? selectedCapability.connectedNodes.includes(node.id) || selectedCapability.id === node.id
        : true;

      const isDimmed = activeWhatIfTarget
        ? !isWhatIfRelevant
        : !matchesLayerFilter || !matchesSectorFilter || (selectedCapability !== null && !isConnectedToSelected);

      // Create Custom HTML Marker Icon
      const iconHtml = `
        <div class="custom-node-marker ${isDimmed ? 'opacity-25 grayscale-[30%] scale-90' : 'opacity-100'} transition-all duration-200 cursor-pointer select-none" style="transform: translate(-50%, -50%);">
          <div class="relative flex flex-col items-center group">
            ${
              (isSelected || isWhatIfPrimary)
                ? `<span class="absolute w-12 h-12 rounded-full animate-ping opacity-40" style="background-color: ${colors.fill}; top: -6px;"></span>
                   <span class="absolute w-9 h-9 rounded-full opacity-50 border-2 animate-pulse" style="border-color: ${isWhatIfPrimary ? '#EA580C' : '#10B981'}; background-color: ${isWhatIfPrimary ? '#EA580C' : '#10B981'}; top: -2px;"></span>`
                : ''
            }
            ${
              ((!isSelected && isConnectedToHovered && !isHovered) || isWhatIfSupporting)
                ? `<span class="absolute w-9 h-9 rounded-full opacity-35 animate-pulse border" style="border-color: ${colors.fill}; background-color: ${colors.fill}; top: -2px;"></span>`
                : ''
            }
            ${
              !isSelected && !isHovered && !isWhatIfPrimary
                ? `<span class="absolute w-7 h-7 rounded-full opacity-20 animate-node-idle" style="background-color: ${colors.fill}; top: 1px; animation-delay: ${(nodeIdx * 0.7) % 3}s;"></span>`
                : ''
            }
            <div class="w-7 h-7 rounded-full flex items-center justify-center shadow-md transition-all duration-200" style="
              background-color: ${isSelected || isWhatIfPrimary ? '#0F172A' : colors.fill};
              border: ${isWhatIfPrimary ? '2.5px solid #EA580C' : isSelected ? '2.5px solid #10B981' : isHovered ? '2.5px solid #FFFFFF' : '2px solid #FFFFFF'};
              box-shadow: ${isWhatIfPrimary ? '0 0 16px rgba(234, 88, 12, 0.8)' : isSelected ? '0 0 14px rgba(16, 185, 129, 0.7)' : '0 2px 6px rgba(0,0,0,0.25)'};
            ">
              <div class="w-2 h-2 rounded-full" style="background-color: ${isWhatIfPrimary ? '#EA580C' : isSelected ? '#10B981' : '#FFFFFF'};"></div>
            </div>
            <div class="mt-1 px-2 py-0.5 rounded-xs text-[9px] font-bold font-data uppercase tracking-wider whitespace-nowrap shadow-xs flex items-center gap-1 border" style="
              background-color: ${isWhatIfPrimary || isSelected || isHovered ? '#0F172A' : '#FFFFFF'};
              color: ${isWhatIfPrimary || isSelected || isHovered ? '#FFFFFF' : '#0F172A'};
              border-color: ${isWhatIfPrimary ? '#EA580C' : isSelected ? '#10B981' : '#E5E2DC'};
            ">
              <span>${node.shortName}</span>
              ${isWhatIfPrimary ? '<span style="color: #EA580C;">★</span>' : ''}
              ${isSelected && !isWhatIfPrimary ? '<span style="color: #10B981;">✓</span>' : ''}
            </div>
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        html: iconHtml,
        className: 'leaflet-custom-hotspot-container',
        iconSize: [0, 0],
        iconAnchor: [0, 0],
      });

      const marker = L.marker([node.lat, node.lng], {
        icon: customIcon,
        zIndexOffset: isSelected || isWhatIfPrimary ? 1000 : isHovered ? 500 : 100
      }).addTo(map);

      // Event handlers
      marker.on('click', () => {
        handleSelectNode(node);
      });

      marker.on('mouseover', () => {
        setHoveredNode(node);
      });

      marker.on('mouseout', () => {
        setHoveredNode(null);
      });

      markersRef.current.set(node.id, marker);
    });
  }, [
    selectedCapability,
    hoveredNode,
    selectedSector,
    selectedType,
    selectedWhatIf,
    hoveredWhatIfChoice
  ]);

  // Handle selecting a node
  const handleSelectNode = useCallback((node: CapabilityNode) => {
    setSelectedCapability(node);
    onSelectNode(node.id);
    setIsMapCustomized(true);

    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([node.lat, node.lng], 13.5, {
        duration: 1.2,
        easeLinearity: 0.25
      });
    }
  }, [onSelectNode]);

  // Reset map view
  const handleResetMap = useCallback(() => {
    setSelectedCapability(null);
    onSelectNode(null);
    setSelectedWhatIf(null);
    setHoveredWhatIfChoice(null);
    setIsWhatIfOpen(false);
    setIsCapabilityFlowActive(false);
    setIsMacroView(false);
    setIsDiscovering(false);
    setIsMapCustomized(false);

    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(NAGPUR_CENTER, NAGPUR_DEFAULT_ZOOM, {
        duration: 1.0
      });
    }
  }, [onSelectNode]);

  // Zoom In / Out Handlers
  const handleZoomIn = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomIn();
      setIsMapCustomized(true);
    }
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomOut();
      setIsMapCustomized(true);
    }
  };

  // Toggle Macro Overview
  const handleToggleMacroView = () => {
    const nextState = !isMacroView;
    setIsMacroView(nextState);
    if (nextState && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(NAGPUR_CENTER, 10.8, { duration: 1.2 });
      setIsMapCustomized(true);
    }
  };

  // Trigger Discovery Mode
  const handleTriggerDiscovery = () => {
    setIsDiscovering(true);
    const available = PROTOTYPE_CAPABILITY_NODES.filter(n => n.id !== selectedCapability?.id);
    const randomNode = available[Math.floor(Math.random() * available.length)];
    if (randomNode) {
      handleSelectNode(randomNode);
    }
  };

  // Launch What-If scenario
  const handleOpenWhatIf = () => {
    setIsWhatIfOpen(true);
    setSelectedWhatIf(null);
    setWhatIfVisibleStage(1);
    setIsCapabilityFlowActive(false);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(NAGPUR_CENTER, 11.2, { duration: 1.0 });
    }
  };

  const handleSelectWhatIfScenario = (scenario: WhatIfScenario) => {
    setSelectedWhatIf(scenario);
    setWhatIfVisibleStage(1);
    const primaryNode = PROTOTYPE_CAPABILITY_NODES.find(n => n.id === scenario.primaryNodeId);
    if (primaryNode && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([primaryNode.lat, primaryNode.lng], 12.8, { duration: 1.2 });
    }
  };

  const handleJumpToStage = (stageNum: number) => {
    setWhatIfVisibleStage(Math.max(1, Math.min(5, stageNum)));
  };

  const handleExploreAnother = () => {
    setSelectedWhatIf(null);
    setWhatIfVisibleStage(1);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(NAGPUR_CENTER, 11.2, { duration: 1.0 });
    }
  };

  const handleExploreThisEcosystem = (scenario: WhatIfScenario) => {
    setIsWhatIfOpen(false);
    const primaryNode = PROTOTYPE_CAPABILITY_NODES.find(n => n.id === scenario.primaryNodeId);
    if (primaryNode) {
      handleSelectNode(primaryNode);
    }
  };

  // Launch Capability Flow
  const handleLaunchCapabilityFlow = (node: CapabilityNode) => {
    setIsCapabilityFlowActive(true);
    setExpandedFlowStage('gap');
    setFlowVisibleStage(1);
  };

  // Compute stats for Macro View
  const { totalTalentCount, totalDemandCount, avgSkillGap, matchingCount } = useMemo(() => {
    let totalTalent = 0;
    let totalDemand = 0;
    let totalGap = 0;
    let count = 0;

    PROTOTYPE_CAPABILITY_NODES.forEach((n) => {
      const matchType = selectedType === 'All' || n.type === selectedType;
      const matchSector = selectedSector === 'All' || n.category === selectedSector;
      if (matchType && matchSector) {
        totalTalent += n.talentCount;
        totalDemand += n.industryDemand;
        totalGap += n.skillGap;
        count++;
      }
    });

    return {
      totalTalentCount: totalTalent,
      totalDemandCount: totalDemand,
      avgSkillGap: count > 0 ? (totalGap / count).toFixed(1) : '0',
      matchingCount: count,
    };
  }, [selectedSector, selectedType]);

  // Projected SVG coordinates for capability connection lines
  const projectedCorridors = useMemo(() => {
    const map = mapInstanceRef.current;
    if (!map) return [];

    return NETWORK_CORRIDORS.map(corridor => {
      const nodeA = PROTOTYPE_CAPABILITY_NODES.find(n => n.id === corridor.from);
      const nodeB = PROTOTYPE_CAPABILITY_NODES.find(n => n.id === corridor.to);
      if (!nodeA || !nodeB) return null;

      const ptA = map.latLngToContainerPoint([nodeA.lat, nodeA.lng]);
      const ptB = map.latLngToContainerPoint([nodeB.lat, nodeB.lng]);

      const isNodeAMatched = selectedType === 'All' || nodeA.type === selectedType;
      const isNodeBMatched = selectedType === 'All' || nodeB.type === selectedType;
      const isCorridorFilteredOut = selectedType !== 'All' && !isNodeAMatched && !isNodeBMatched;

      const isDirectlyHovered = hoveredNode && (corridor.from === hoveredNode.id || corridor.to === hoveredNode.id);
      const isSelectedActive = selectedCapability && (corridor.from === selectedCapability.id || corridor.to === selectedCapability.id);
      const isCorridorHovered = hoveredCorridor?.from === corridor.from && hoveredCorridor?.to === corridor.to;

      const isWhatIfActive = selectedWhatIf && (
        corridor.from === selectedWhatIf.primaryNodeId || 
        corridor.to === selectedWhatIf.primaryNodeId ||
        selectedWhatIf.supportingNodeIds.includes(corridor.from) ||
        selectedWhatIf.supportingNodeIds.includes(corridor.to)
      );

      const isBrokenGapStage = selectedWhatIf && whatIfVisibleStage === 3 && isWhatIfActive;
      const isOpportunityStage = selectedWhatIf && whatIfVisibleStage === 5 && isWhatIfActive;
      const isActiveConnection = isSelectedActive || isDirectlyHovered || isWhatIfActive || isCorridorHovered || isMacroView;

      return {
        corridor,
        x1: ptA.x,
        y1: ptA.y,
        x2: ptB.x,
        y2: ptB.y,
        isCorridorFilteredOut,
        isBrokenGapStage,
        isOpportunityStage,
        isActiveConnection,
        isSelectedActive,
        isDirectlyHovered,
        isWhatIfActive,
        isCorridorHovered
      };
    }).filter(Boolean);
  }, [
    selectedType,
    hoveredNode,
    selectedCapability,
    hoveredCorridor,
    selectedWhatIf,
    whatIfVisibleStage,
    isMacroView,
    mapContainerRef.current
  ]);

  return (
    <div className="relative w-full rounded-xs border border-[#E8E4D9] bg-[#FAF8F5] shadow-2xs overflow-hidden">
      {/* 1. TOP INTERACTION CONTROL BAR */}
      <div className="px-4 py-2.5 bg-[#FAF8F5] border-b border-[#E8E4D9] flex flex-wrap items-center justify-between gap-3 z-30 relative">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3C9270] animate-pulse" />
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-xs sm:text-sm tracking-tight text-[#17212B] font-sans">
                Nagpur Regional Map & Capability Hotspots
              </h3>
              <span className="text-[10px] font-medium text-[#5C6773] bg-[#F5F1E8] px-2 py-0.5 border border-[#E8E4D9] rounded-xs font-data hidden sm:inline">
                {matchingCount} Hotspots Active
              </span>
              {selectedType !== 'All' && (
                <span className="text-[9px] font-bold text-[#2878A8] bg-[#EBF3F8] px-1.5 py-0.5 border border-[#BBD5E6] rounded-xs font-data flex items-center gap-1">
                  <Filter className="w-2.5 h-2.5" />
                  <span>Layer: {selectedType.replace('_', ' ').toUpperCase()}</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action Triggers */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* DISCOVERY MODE TRIGGER */}
          <button
            type="button"
            onClick={handleTriggerDiscovery}
            aria-label="Discover an interesting capability in Nagpur"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#EBF3F8] hover:bg-[#D4E7F2] text-[#1F5F85] border border-[#BBD5E6] text-[10px] font-bold uppercase font-data rounded-xs cursor-pointer transition-all shadow-2xs hover:shadow-xs"
            title="Discover capability relationships inside Nagpur"
          >
            <CompassIcon className="w-3.5 h-3.5 text-[#2878A8]" />
            <span>{isDiscovering ? 'NEXT DISCOVERY →' : 'DISCOVER →'}</span>
          </button>

          {/* SIGNATURE "WHAT IF NAGPUR...?" INVITATION CONTROL */}
          <button
            type="button"
            onClick={handleOpenWhatIf}
            aria-label="Open What If Nagpur Scenario Explorer"
            className={`group inline-flex items-center gap-2.5 px-3 py-1.5 rounded-xs transition-all cursor-pointer shadow-2xs border ${
              isWhatIfOpen 
                ? 'bg-[#17212B] text-[#F5F1E8] border-[#17212B]' 
                : 'bg-[#FAF8F5] hover:bg-[#E8E4D9] text-[#17212B] border-[#17212B] hover:shadow-xs'
            }`}
          >
            <div className="relative flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-[#E58A32] animate-pulse shrink-0" />
              <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-[#E58A32] rounded-full animate-ping" />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold tracking-wider uppercase font-data block leading-tight">
                  WHAT IF NAGPUR...?
                </span>
                <span className="text-[9px] font-bold text-[#E58A32] font-data hidden sm:inline">
                  → Explore scenarios
                </span>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-[#E58A32] group-hover:translate-x-0.5 transition-transform shrink-0" />
          </button>

          {/* ELEGANT "RESET VIEW" CONTROL */}
          {isMapCustomized && (
            <button
              type="button"
              onClick={handleResetMap}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-[#FAF8F5] hover:bg-[#E8E4D9] text-[#17212B] border border-[#D8D3C5] text-[10px] font-bold uppercase font-data rounded-xs cursor-pointer transition-all shadow-2xs hover:border-[#17212B]"
              title="Reset map view to default"
            >
              <RotateCcw className="w-3 h-3 text-[#17212B]" />
              <span>RESET MAP</span>
            </button>
          )}

          {/* Macro Overview Toggle */}
          <button
            type="button"
            onClick={handleToggleMacroView}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[10px] font-bold uppercase font-data rounded-xs transition-all cursor-pointer ${
              isMacroView
                ? 'bg-[#3C9270] text-white shadow-xs'
                : 'bg-[#FAF8F5] hover:bg-[#E8E4D9] text-[#17212B] border border-[#E8E4D9]'
            }`}
          >
            <Globe className="w-3 h-3" />
            <span>{isMacroView ? 'Macro View Active' : 'Macro Ecosystem'}</span>
          </button>
        </div>
      </div>

      {/* Macro Ecosystem Banner Overlay */}
      {isMacroView && (
        <div className="bg-[#FAF8F5]/95 backdrop-blur-sm border-b border-[#E8E4D9] px-4 py-2 flex flex-wrap items-center justify-between gap-3 z-20 relative text-xs animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#3C9270] animate-pulse" />
            <span className="font-bold text-[#17212B] font-data uppercase tracking-wider text-[10px]">
              Nagpur Metropolitan Macro Capability Overview:
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-data flex-wrap">
            <span>Talent: <strong className="text-[#17212B]">{totalTalentCount.toLocaleString()}</strong></span>
            <span>Demand: <strong className="text-[#2878A8]">{totalDemandCount.toLocaleString()}</strong></span>
            <span>Avg Skill Gap: <strong className="text-[#D65F52]">{avgSkillGap}%</strong></span>
            <span>Key Sectors: <strong className="text-[#3C9270]">8 Active Zones</strong></span>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. REAL GEOGRAPHIC MAP CONTAINER WITH DYNAMIC INTELLIGENCE OVERLAYS */}
      {/* ========================================================================= */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/10] min-h-[520px] max-h-[700px] overflow-hidden select-none bg-[#F5F4F0]">
        {/* Real Leaflet Map Root */}
        <div 
          id="nagpur-map-root" 
          ref={mapContainerRef} 
          className="absolute inset-0 w-full h-full z-10"
        />

        {/* Real SVG Overlay for Capability Intelligence Relationships (Drawn over geographic map) */}
        <svg
          ref={svgOverlayRef}
          className="absolute inset-0 w-full h-full z-20 pointer-events-none"
        >
          <g className="capability-corridors">
            {projectedCorridors.map((item, idx) => {
              if (!item) return null;
              const {
                corridor,
                x1,
                y1,
                x2,
                y2,
                isCorridorFilteredOut,
                isBrokenGapStage,
                isOpportunityStage,
                isActiveConnection,
                isSelectedActive,
                isDirectlyHovered,
                isWhatIfActive,
                isCorridorHovered
              } = item;

              return (
                <g key={`corr-${idx}`} opacity={isCorridorFilteredOut ? 0.1 : 1}>
                  {/* Base Corridor Line */}
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={
                      isBrokenGapStage
                        ? '#EA580C'
                        : isOpportunityStage
                          ? '#10B981'
                          : isSelectedActive || isWhatIfActive || isCorridorHovered
                            ? '#2563EB'
                            : isDirectlyHovered
                              ? '#2563EB'
                              : isMacroView
                                ? '#3B82F6'
                                : '#94A3B8'
                    }
                    strokeWidth={
                      isBrokenGapStage || isOpportunityStage
                        ? 3.2
                        : isSelectedActive || isWhatIfActive || isCorridorHovered
                          ? 2.8
                          : isDirectlyHovered
                            ? 2.2
                            : 1.2
                    }
                    strokeDasharray={
                      isBrokenGapStage
                        ? '5 6'
                        : isOpportunityStage
                          ? '6 3'
                          : isSelectedActive || isWhatIfActive
                            ? '6 4'
                            : '4 4'
                    }
                    strokeOpacity={isSelectedActive || isWhatIfActive || isCorridorHovered ? 0.95 : isDirectlyHovered ? 0.9 : 0.45}
                  />

                  {/* Flow Animation when Corridor is Active */}
                  {isActiveConnection && (
                    <line
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={
                        isBrokenGapStage
                          ? '#EA580C'
                          : isOpportunityStage
                            ? '#10B981'
                            : isSelectedActive || isWhatIfActive
                              ? '#38BDF8'
                              : '#2563EB'
                      }
                      strokeWidth={isBrokenGapStage || isOpportunityStage ? 3.2 : 2.4}
                      strokeDasharray={isBrokenGapStage ? '4 8' : '4 6'}
                      className={
                        isBrokenGapStage
                          ? 'animate-broken-gap'
                          : isOpportunityStage || isSelectedActive || isWhatIfActive
                            ? 'animate-flow-fast'
                            : 'animate-flow-corridor'
                      }
                      strokeOpacity="0.9"
                    />
                  )}
                </g>
              );
            })}
          </g>
        </svg>

        {/* FLOATING MAP NAVIGATION & ZOOM CONTROLS (Top Left) */}
        <div className="absolute top-3 left-3 z-30 flex flex-col gap-1.5 bg-white/95 backdrop-blur-md border border-[#E5E2DC] p-1.5 rounded-xs shadow-xs">
          <button
            type="button"
            onClick={handleZoomIn}
            aria-label="Zoom In"
            className="p-1.5 text-[#0F172A] hover:bg-[#F2F1EE] rounded-xs cursor-pointer transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleZoomOut}
            aria-label="Zoom Out"
            className="p-1.5 text-[#0F172A] hover:bg-[#F2F1EE] rounded-xs cursor-pointer transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleResetMap}
            aria-label="Reset Map"
            className="p-1.5 text-[#64748B] hover:text-[#0F172A] hover:bg-[#F2F1EE] rounded-xs cursor-pointer transition-colors border-t border-[#E5E2DC]"
            title="RESET MAP VIEW"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* HOVER TOOLTIP ON CAPABILITY HOTSPOT */}
        {hoveredNode && !selectedCapability && !isWhatIfOpen && (
          <div 
            className="absolute top-3 right-3 z-30 bg-[#0F172A] text-white px-3.5 py-2 rounded-xs border border-slate-700 shadow-xl text-xs font-sans flex flex-col gap-1 pointer-events-none animate-in fade-in duration-150 max-w-xs"
          >
            <div className="flex items-center gap-2">
              <span 
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: CATEGORY_COLORS[hoveredNode.category].fill }}
              />
              <span className="font-bold text-sm">{hoveredNode.name}</span>
            </div>
            <div className="text-[10px] text-slate-300 font-data">
              📍 {hoveredNode.location}
            </div>
            <div className="flex items-center gap-2 text-[10px] font-data pt-1 border-t border-slate-800 text-slate-300">
              <span>Talent: <strong className="text-white">{hoveredNode.talentCount.toLocaleString()}</strong></span>
              <span>•</span>
              <span>Demand: <strong className="text-[#38BDF8]">{hoveredNode.industryDemand.toLocaleString()}</strong></span>
              <span>•</span>
              <span>Gap: <strong className="text-[#EA580C]">{hoveredNode.skillGap}%</strong></span>
            </div>
            <div className="text-[9px] text-[#38BDF8] font-data">
              Click marker to inspect capability flow & pathways →
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 3. "WHAT IF NAGPUR...?" IMMERSIVE EXPLORATION (SPATIAL OVERLAY) */}
        {/* ========================================================================= */}
        {isWhatIfOpen && (
          <div className="absolute inset-0 z-50 bg-[#0F172A]/85 backdrop-blur-md p-4 sm:p-6 flex flex-col justify-between overflow-y-auto animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b border-[#334155] pb-3 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 bg-[#EA580C] text-white rounded-xs shadow-xs">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white font-data">
                      WHAT IF NAGPUR...?
                    </h3>
                    <span className="text-[9px] font-bold text-[#F59E0B] bg-[#F59E0B]/15 px-1.5 py-0.2 rounded-xs border border-[#F59E0B]/30 font-data">
                      SPATIAL SCENARIO ENGINE
                    </span>
                  </div>
                  <p className="text-xs text-[#94A3B8] font-sans">
                    {selectedWhatIf ? selectedWhatIf.subtitle : "What would you like to explore?"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {selectedWhatIf && (
                  <button
                    type="button"
                    onClick={handleExploreAnother}
                    className="px-3 py-1.5 bg-[#1E293B] hover:bg-[#334155] text-[#CBD5E1] hover:text-white text-xs font-semibold uppercase tracking-wider rounded-xs border border-[#334155] cursor-pointer flex items-center gap-1.5 transition-colors font-data"
                  >
                    <RotateCw className="w-3.5 h-3.5 text-[#EA580C]" />
                    <span>Explore Another</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleResetMap}
                  className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider rounded-xs border border-white/20 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs font-data"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>← Back to Map</span>
                </button>
              </div>
            </div>

            {!selectedWhatIf ? (
              <div className="my-auto py-4 max-w-5xl mx-auto w-full">
                <div className="text-center mb-6">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#F59E0B] font-data block mb-1">
                    WHAT WOULD YOU LIKE TO EXPLORE?
                  </span>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl text-white font-bold tracking-tight">
                    Select a future capability vector for Nagpur
                  </h2>
                  <p className="text-xs text-[#94A3B8] mt-1.5 max-w-xl mx-auto">
                    Hover over any vector to preview its spatial anchor points on the regional city map
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                  {WHAT_IF_SCENARIOS.map((scenario) => {
                    const isHoveredChoice = hoveredWhatIfChoice?.id === scenario.id;
                    return (
                      <button
                        key={scenario.id}
                        type="button"
                        onClick={() => handleSelectWhatIfScenario(scenario)}
                        onMouseEnter={() => setHoveredWhatIfChoice(scenario)}
                        onMouseLeave={() => setHoveredWhatIfChoice(null)}
                        className={`group relative p-4 rounded-xs text-left transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[180px] border ${
                          isHoveredChoice 
                            ? 'bg-[#1E293B] border-[#EA580C] shadow-lg scale-[1.02]' 
                            : 'bg-[#0F172A]/90 hover:bg-[#1E293B] border-[#334155] hover:border-[#EA580C]/80 shadow-sm'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-lg">{scenario.icon}</span>
                            <span className="text-[8px] font-bold font-data text-[#EA580C] uppercase tracking-wider bg-[#EA580C]/10 px-1.5 py-0.5 rounded-xs border border-[#EA580C]/20">
                              {scenario.category}
                            </span>
                          </div>

                          <h4 className="text-sm font-bold text-white tracking-wider uppercase group-hover:text-[#FDBA74] transition-colors leading-tight">
                            {scenario.title}
                          </h4>

                          <p className="text-[10.5px] text-[#94A3B8] mt-1.5 line-clamp-2 leading-relaxed">
                            {scenario.subtitle}
                          </p>
                        </div>

                        <div className="pt-2.5 mt-3 border-t border-[#334155]/80 space-y-1">
                          <div className="text-[9px] font-data text-[#F59E0B] line-clamp-1 flex items-center gap-1">
                            <Target className="w-2.5 h-2.5 shrink-0" />
                            <span>{scenario.spatialAnchor}</span>
                          </div>

                          <div className="flex items-center justify-between text-[9.5px] font-data text-[#CBD5E1]">
                            <span>Talent: <strong>{scenario.talentCount.toLocaleString()}</strong></span>
                            <span className="text-[#38BDF8]">Demand: <strong>{scenario.demandCount.toLocaleString()}</strong></span>
                          </div>

                          <div className="pt-1 flex items-center justify-between text-[9px] font-bold text-[#EA580C] group-hover:translate-x-0.5 transition-transform font-data">
                            <span>Explore Vector</span>
                            <ArrowRight className="w-3 h-3" />
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* Progressive 5-Stage Visual Narrative */
              <div className="my-auto py-3 max-w-4xl mx-auto w-full space-y-4 animate-in fade-in duration-300">
                <div className="flex items-center justify-between flex-wrap gap-2 pb-2.5 border-b border-[#334155]">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#EA580C] font-data flex items-center gap-1.5">
                      <span>{selectedWhatIf.icon}</span>
                      <span>ECOSYSTEM VECTOR: {selectedWhatIf.title}</span>
                      <span className="text-[#64748B]">•</span>
                      <span className="text-[#94A3B8]">{selectedWhatIf.spatialAnchor}</span>
                    </span>
                    <h3 className="text-2xl sm:text-3xl text-white font-bold mt-0.5 tracking-tight">
                      What if Nagpur scales its {selectedWhatIf.title} ecosystem?
                    </h3>
                  </div>

                  <span className="text-[10px] font-data text-[#94A3B8]">
                    Stage {whatIfVisibleStage} of 5
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 relative">
                  <button
                    type="button"
                    onClick={() => handleJumpToStage(1)}
                    className={`p-3 rounded-xs border text-left transition-all duration-200 cursor-pointer ${
                      whatIfVisibleStage === 1
                        ? 'bg-[#1E293B] border-[#38BDF8] text-white shadow-lg ring-1 ring-[#38BDF8]'
                        : whatIfVisibleStage > 1
                          ? 'bg-[#0F172A] border-[#334155] text-[#CBD5E1]'
                          : 'bg-[#0F172A]/40 border-transparent text-[#64748B] opacity-40'
                    }`}
                  >
                    <div className="text-[8.5px] font-bold uppercase font-data text-[#38BDF8] mb-1 flex items-center justify-between">
                      <span>01 — TALENT</span>
                      {whatIfVisibleStage > 1 && <span className="text-[#10B981]">✓</span>}
                    </div>
                    <div className="text-lg font-bold font-sans">
                      {selectedWhatIf.talentCount.toLocaleString()}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleJumpToStage(2)}
                    className={`p-3 rounded-xs border text-left transition-all duration-200 cursor-pointer ${
                      whatIfVisibleStage === 2
                        ? 'bg-[#1E293B] border-[#818CF8] text-white shadow-lg ring-1 ring-[#818CF8]'
                        : whatIfVisibleStage > 2
                          ? 'bg-[#0F172A] border-[#334155] text-[#CBD5E1]'
                          : 'bg-[#0F172A]/40 border-transparent text-[#64748B] opacity-40'
                    }`}
                  >
                    <div className="text-[8.5px] font-bold uppercase font-data text-[#818CF8] mb-1 flex items-center justify-between">
                      <span>02 — SKILLS</span>
                      {whatIfVisibleStage > 2 && <span className="text-[#10B981]">✓</span>}
                    </div>
                    <div className="text-xs font-bold line-clamp-1 text-white">
                      {selectedWhatIf.keySkills[0]}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleJumpToStage(3)}
                    className={`p-3 rounded-xs border-2 border-dashed text-left transition-all duration-200 cursor-pointer ${
                      whatIfVisibleStage === 3
                        ? 'bg-[#451A03] border-[#EA580C] text-white shadow-lg ring-1 ring-[#EA580C]'
                        : whatIfVisibleStage > 3
                          ? 'bg-[#2A1205] border-[#EA580C]/70 text-[#FED7AA]'
                          : 'bg-[#0F172A]/40 border-transparent text-[#64748B] opacity-40'
                    }`}
                  >
                    <div className="text-[8.5px] font-bold uppercase font-data text-[#FDBA74] mb-1 flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <AlertCircle className="w-2.5 h-2.5 text-[#EA580C]" />
                        <span>03 — GAP</span>
                      </span>
                      {whatIfVisibleStage > 3 && <span className="text-[#EA580C]">⚡</span>}
                    </div>
                    <div className="text-lg font-bold font-sans text-[#FED7AA]">
                      {selectedWhatIf.gapPercent}% Gap
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleJumpToStage(4)}
                    className={`p-3 rounded-xs border text-left transition-all duration-200 cursor-pointer ${
                      whatIfVisibleStage === 4
                        ? 'bg-[#1E293B] border-[#38BDF8] text-white shadow-lg ring-1 ring-[#38BDF8]'
                        : whatIfVisibleStage > 4
                          ? 'bg-[#0F172A] border-[#334155] text-[#CBD5E1]'
                          : 'bg-[#0F172A]/40 border-transparent text-[#64748B] opacity-40'
                    }`}
                  >
                    <div className="text-[8.5px] font-bold uppercase font-data text-[#38BDF8] mb-1 flex items-center justify-between">
                      <span>04 — DEMAND</span>
                      {whatIfVisibleStage > 4 && <span className="text-[#10B981]">✓</span>}
                    </div>
                    <div className="text-lg font-bold font-sans text-[#38BDF8]">
                      {selectedWhatIf.demandCount.toLocaleString()}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleJumpToStage(5)}
                    className={`p-3 rounded-xs border text-left transition-all duration-200 cursor-pointer ${
                      whatIfVisibleStage === 5
                        ? 'bg-[#064E3B] border-[#10B981] text-white shadow-lg ring-1 ring-[#10B981]'
                        : whatIfVisibleStage > 5
                          ? 'bg-[#064E3B]/60 border-[#10B981]/60 text-white'
                          : 'bg-[#0F172A]/40 border-transparent text-[#64748B] opacity-40'
                    }`}
                  >
                    <div className="text-[8.5px] font-bold uppercase font-data text-[#6EE7B7] mb-1 flex items-center justify-between">
                      <span>05 — IMPACT</span>
                      {whatIfVisibleStage === 5 && <span className="text-[#10B981]">★</span>}
                    </div>
                    <div className="text-xs font-bold text-[#A7F3D0] line-clamp-1">
                      Transformation
                    </div>
                  </button>
                </div>

                <div className="bg-[#0F172A] border border-[#334155] p-4 sm:p-5 rounded-xs space-y-3.5 shadow-md">
                  {whatIfVisibleStage === 1 && (
                    <div className="space-y-2 animate-in fade-in duration-200">
                      <div className="text-[9.5px] font-bold uppercase tracking-widest text-[#38BDF8] font-data">
                        01 — EXISTING TALENT • "NAGPUR ALREADY HAS CAPABILITY."
                      </div>
                      <h4 className="text-base sm:text-lg font-bold text-white leading-snug">
                        "{selectedWhatIf.stage01TalentQuote}"
                      </h4>
                    </div>
                  )}

                  {whatIfVisibleStage === 2 && (
                    <div className="space-y-2 animate-in fade-in duration-200">
                      <div className="text-[9.5px] font-bold uppercase tracking-widest text-[#818CF8] font-data">
                        02 — SKILLS • "THESE CAPABILITIES CREATE THE FOUNDATION."
                      </div>
                      <h4 className="text-base sm:text-lg font-bold text-white leading-snug">
                        "{selectedWhatIf.stage02SkillsQuote}"
                      </h4>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {selectedWhatIf.keySkills.map((sk, idx) => (
                          <span key={idx} className="px-2 py-1 bg-[#1E293B] text-[#E2E8F0] text-xs font-semibold rounded-xs border border-[#334155] font-data">
                            ✓ {sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {whatIfVisibleStage === 3 && (
                    <div className="space-y-2 animate-in fade-in duration-200">
                      <div className="text-[9.5px] font-bold uppercase tracking-widest text-[#EA580C] font-data flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>03 — SKILL GAP • "BUT SOMETHING IS MISSING."</span>
                      </div>
                      <h4 className="text-base sm:text-lg font-bold text-[#FED7AA] leading-snug">
                        "{selectedWhatIf.stage03GapQuote}"
                      </h4>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {selectedWhatIf.missingSkills.map((msk, idx) => (
                          <span key={idx} className="px-2 py-0.5 bg-[#451A03] text-[#FDBA74] text-[11px] font-bold rounded-xs border border-[#EA580C]/50 font-data">
                            ⚡ {msk}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {whatIfVisibleStage === 4 && (
                    <div className="space-y-2 animate-in fade-in duration-200">
                      <div className="text-[9.5px] font-bold uppercase tracking-widest text-[#38BDF8] font-data">
                        04 — INDUSTRY DEMAND • "INDUSTRY DEMAND IS MOVING."
                      </div>
                      <h4 className="text-base sm:text-lg font-bold text-white leading-snug">
                        "{selectedWhatIf.stage04DemandQuote}"
                      </h4>
                    </div>
                  )}

                  {whatIfVisibleStage >= 5 && (
                    <div className="space-y-3 animate-in fade-in duration-200">
                      <div className="text-[9.5px] font-bold uppercase tracking-widest text-[#10B981] font-data flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#10B981]" />
                        <span>05 — OPPORTUNITY • "SO WHERE IS THE OPPORTUNITY?"</span>
                      </div>
                      <h4 className="text-base sm:text-lg font-bold text-[#A7F3D0] leading-snug">
                        "{selectedWhatIf.stage05OpportunityQuote}"
                      </h4>

                      <div className="p-3.5 bg-[#064E3B]/50 border border-[#10B981]/50 rounded-xs">
                        <p className="text-sm text-white font-medium leading-relaxed">
                          "{selectedWhatIf.finalConclusion}"
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="pt-2 border-t border-[#334155] flex items-center justify-between text-xs">
                    <button
                      type="button"
                      disabled={whatIfVisibleStage <= 1}
                      onClick={() => handleJumpToStage(whatIfVisibleStage - 1)}
                      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xs uppercase font-data font-bold tracking-wider transition-colors ${
                        whatIfVisibleStage <= 1 
                          ? 'opacity-30 cursor-not-allowed text-[#64748B]' 
                          : 'bg-[#1E293B] text-white hover:bg-[#334155] cursor-pointer'
                      }`}
                    >
                      <ArrowLeft className="w-3 h-3" />
                      <span>Previous Stage</span>
                    </button>

                    {whatIfVisibleStage < 5 ? (
                      <button
                        type="button"
                        onClick={() => handleJumpToStage(whatIfVisibleStage + 1)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#EA580C] hover:bg-[#C2410C] text-white rounded-xs uppercase font-data font-bold tracking-wider cursor-pointer shadow-xs transition-colors"
                      >
                        <span>Next: Stage 0{whatIfVisibleStage + 1}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleExploreThisEcosystem(selectedWhatIf)}
                        className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#10B981] hover:bg-[#059669] text-white rounded-xs uppercase font-data font-bold tracking-wider cursor-pointer shadow-md transition-colors animate-pulse"
                      >
                        <span>EXPLORE THIS ECOSYSTEM →</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ===================================================================== */}
        {/* 4. "CAPABILITY FLOW" FOCUSED STATE OVERLAY */}
        {/* ===================================================================== */}
        {isCapabilityFlowActive && selectedCapability && (
          <div className="absolute inset-0 z-50 bg-[#FBFBFA]/95 backdrop-blur-md p-4 sm:p-6 flex flex-col justify-between overflow-y-auto animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b border-[#E5E2DC] pb-3">
              <div className="flex items-center gap-3">
                <span 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: CATEGORY_COLORS[selectedCapability.category].fill }}
                />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#64748B] font-data">
                    CAPABILITY FLOW • {selectedCapability.category}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#0F172A] leading-tight">
                    {selectedCapability.name}
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsCapabilityFlowActive(false)}
                className="px-3 py-1.5 bg-white hover:bg-[#F2F1EE] text-[#0F172A] text-xs font-bold uppercase tracking-wider rounded-xs border border-[#CBD5E1] transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs font-data"
              >
                <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                <span>← Back to Map</span>
              </button>
            </div>

            <div className="my-auto py-4 max-w-4xl mx-auto w-full space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
                <button
                  type="button"
                  onClick={() => setExpandedFlowStage(expandedFlowStage === 'talent' ? null : 'talent')}
                  className={`p-3.5 rounded-xs border text-left transition-all duration-300 cursor-pointer ${
                    flowVisibleStage >= 1
                      ? expandedFlowStage === 'talent'
                        ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-md scale-[1.02]'
                        : 'bg-white text-[#0F172A] border-[#E5E2DC]'
                      : 'opacity-20 pointer-events-none'
                  }`}
                >
                  <div className="text-[9px] font-bold uppercase font-data text-[#64748B] mb-1">TALENT</div>
                  <div className="text-xl sm:text-2xl font-bold font-data">{selectedCapability.talentCount.toLocaleString()}</div>
                </button>

                <button
                  type="button"
                  onClick={() => setExpandedFlowStage(expandedFlowStage === 'skills' ? null : 'skills')}
                  className={`p-3.5 rounded-xs border text-left transition-all duration-300 cursor-pointer ${
                    flowVisibleStage >= 2
                      ? expandedFlowStage === 'skills'
                        ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-md scale-[1.02]'
                        : 'bg-white text-[#0F172A] border-[#E5E2DC]'
                      : 'opacity-20 pointer-events-none'
                  }`}
                >
                  <div className="text-[9px] font-bold uppercase font-data text-[#64748B] mb-1">SKILLS</div>
                  <div className="text-xs font-bold line-clamp-1">{selectedCapability.skillsList[0]}</div>
                </button>

                <button
                  type="button"
                  onClick={() => setExpandedFlowStage(expandedFlowStage === 'gap' ? null : 'gap')}
                  className={`p-3.5 rounded-xs border-2 border-dashed text-left transition-all duration-300 cursor-pointer ${
                    flowVisibleStage >= 3
                      ? expandedFlowStage === 'gap'
                        ? 'bg-[#EA580C] text-white border-[#9A3412] shadow-md scale-[1.02]'
                        : 'bg-[#FFF7ED] text-[#9A3412] border-[#EA580C]'
                      : 'opacity-20 pointer-events-none'
                  }`}
                >
                  <div className="text-[9px] font-bold uppercase font-data text-[#EA580C] mb-1 flex items-center gap-1">
                    <AlertCircle className="w-2.5 h-2.5" />
                    <span>SKILL GAP</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold font-data">{selectedCapability.skillGap}%</div>
                </button>

                <button
                  type="button"
                  onClick={() => setExpandedFlowStage(expandedFlowStage === 'demand' ? null : 'demand')}
                  className={`p-3.5 rounded-xs border text-left transition-all duration-300 cursor-pointer ${
                    flowVisibleStage >= 4
                      ? expandedFlowStage === 'demand'
                        ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-md scale-[1.02]'
                        : 'bg-white text-[#0F172A] border-[#E5E2DC]'
                      : 'opacity-20 pointer-events-none'
                  }`}
                >
                  <div className="text-[9px] font-bold uppercase font-data text-[#64748B] mb-1">DEMAND</div>
                  <div className="text-xl sm:text-2xl font-bold text-[#2563EB] font-data">{selectedCapability.industryDemand.toLocaleString()}</div>
                </button>

                <button
                  type="button"
                  onClick={() => setExpandedFlowStage(expandedFlowStage === 'opportunity' ? null : 'opportunity')}
                  className={`p-3.5 rounded-xs border text-left transition-all duration-300 cursor-pointer ${
                    flowVisibleStage >= 5
                      ? expandedFlowStage === 'opportunity'
                        ? 'bg-[#059669] text-white border-[#047857] shadow-md scale-[1.02]'
                        : 'bg-[#ECFDF5] text-[#065F46] border-[#10B981]'
                      : 'opacity-20 pointer-events-none'
                  }`}
                >
                  <div className="text-[9px] font-bold uppercase font-data text-[#059669] mb-1">OPPORTUNITY</div>
                  <div className="text-xs font-bold line-clamp-2">{selectedCapability.opportunity}</div>
                </button>
              </div>

              {/* Dynamic details for expanded stage */}
              <div className="bg-white border border-[#E5E2DC] p-4 sm:p-5 rounded-xs shadow-xs animate-in fade-in duration-200">
                {expandedFlowStage === 'gap' && (
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#EA580C] font-data flex items-center gap-1.5">
                      <AlertCircle className="w-3 h-3" />
                      STAGE 3: ACTIVE SKILL GAP DEFICIT ({selectedCapability.skillGap}%)
                    </span>
                    <h4 className="text-base font-bold text-[#9A3412] mt-1">{selectedCapability.gapDetails}</h4>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {selectedCapability.missingSkills.map((ms, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-[#FFF7ED] text-[#EA580C] text-[11px] font-bold rounded-xs border border-[#FED7AA] font-data">
                          ⚡ {ms}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {expandedFlowStage === 'opportunity' && (
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#059669] font-data">
                      STAGE 5: STRATEGIC OPPORTUNITY STATEMENT
                    </span>
                    <h4 className="text-base font-bold text-[#065F46] mt-1">"{selectedCapability.opportunity}"</h4>
                    <div className="mt-2.5 pt-2.5 border-t border-[#E5E2DC] flex items-center justify-between text-xs font-data">
                      <span className="text-[#64748B]">Target Roles: {selectedCapability.careerPath.targetRoles.slice(0, 2).join(', ')}</span>
                      <span className="font-bold text-[#059669]">{selectedCapability.careerPath.avgStartingSalary}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-[#E5E2DC] flex items-center justify-between text-xs">
              <span className="text-[#94A3B8] font-data">Capability Flow Simulation</span>
              <button
                type="button"
                onClick={() => setIsCapabilityFlowActive(false)}
                className="px-4 py-2 bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-bold uppercase tracking-wider rounded-xs cursor-pointer shadow-2xs font-data"
              >
                ← Return to Map
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 5. STANDARD CONTEXTUAL INTELLIGENCE & STAGED NETWORK REVEAL DRAWER */}
        {/* ========================================================================= */}
        {selectedCapability && !isCapabilityFlowActive && !isWhatIfOpen && (
          <div 
            id="capability-detail-panel"
            className="absolute top-2 right-2 bottom-2 z-40 w-full max-w-[340px] sm:max-w-[380px] bg-[#FBFBFA] border-2 border-[#0F172A] shadow-2xl p-4 sm:p-5 flex flex-col justify-between overflow-y-auto pointer-events-auto transition-all duration-300 ease-out animate-in slide-in-from-right-6 fade-in rounded-xs"
          >
            <div className="space-y-3">
              {/* Header */}
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#E5E2DC]">
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span 
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: CATEGORY_COLORS[selectedCapability.category].fill }}
                    />
                    <span 
                      className="text-[10px] font-bold uppercase tracking-widest font-data"
                      style={{ color: CATEGORY_COLORS[selectedCapability.category].text }}
                    >
                      {selectedCapability.category}
                    </span>
                    <span className="text-[9px] font-bold text-[#64748B] bg-white px-1.5 py-0.2 border border-[#E5E2DC] rounded-xs font-data">
                      {selectedCapability.typeLabel}
                    </span>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight leading-tight">
                    {selectedCapability.name}
                  </h4>
                  <div className="text-xs text-[#64748B] mt-0.5 font-data flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#EA580C]" />
                    <span>{selectedCapability.location}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleResetMap}
                  aria-label="Close detail panel"
                  className="p-1.5 text-[#64748B] hover:text-[#0F172A] hover:bg-[#F2F1EE] rounded-xs transition-colors border border-[#E5E2DC] cursor-pointer shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* ACTION: "EXPLORE CAPABILITY FLOW →" */}
              <button
                type="button"
                onClick={() => handleLaunchCapabilityFlow(selectedCapability)}
                className="w-full group p-2.5 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-xs transition-all shadow-xs flex items-center justify-between cursor-pointer border border-[#0F172A]"
              >
                <div className="text-left">
                  <span className="text-[10px] font-bold uppercase tracking-wider font-data flex items-center gap-1.5 text-[#F59E0B]">
                    <Zap className="w-3 h-3" />
                    <span>EXPLORE CAPABILITY FLOW →</span>
                  </span>
                  <span className="text-[9px] text-[#CBD5E1] block mt-0.5">
                    Inspect Talent → Skills → Gap → Demand → Opportunity
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform shrink-0" />
              </button>

              {/* STAGED NETWORK REVEAL RIBBON */}
              <div className="p-2.5 bg-white border border-[#E5E2DC] rounded-xs shadow-2xs space-y-1.5">
                <div className="text-[9px] font-bold uppercase tracking-widest text-[#0F172A] font-data flex items-center justify-between">
                  <span>Interactive Network Reveal</span>
                  <span className="text-[#10B981] font-bold">Stage {networkRevealStage + 1}/5</span>
                </div>
                <div className="flex items-center gap-1">
                  {['Capability', 'Skills', 'Industry', 'Gap', 'Opportunity'].map((stg, i) => (
                    <div
                      key={stg}
                      className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                        i <= networkRevealStage ? 'bg-[#10B981]' : 'bg-[#E2E8F0]'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* 4-STAGE PIPELINE SUMMARY */}
              <div className="bg-white border border-[#E5E2DC] p-3 rounded-xs shadow-2xs">
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#0F172A] font-data mb-2.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-[#EA580C]" />
                    <span>Transformation Pathway</span>
                  </span>
                  <span className="text-[9px] text-[#EA580C] bg-[#FFF7ED] px-1.5 py-0.5 rounded-xs font-bold font-data">
                    {selectedCapability.skillGap}% Skill Gap
                  </span>
                </div>

                <div className="space-y-2 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E2E8F0]">
                  <div className="relative flex items-start gap-2.5 pl-6">
                    <div className="absolute left-1.5 top-1 w-3 h-3 rounded-full bg-[#2563EB] border-2 border-white" />
                    <div>
                      <div className="text-[10px] font-bold uppercase text-[#64748B] font-data">1. Talent Pool</div>
                      <div className="text-sm font-bold text-[#0F172A]">{selectedCapability.talentCount.toLocaleString()} Specialists</div>
                    </div>
                  </div>

                  <div className="relative flex items-start gap-2.5 pl-6 bg-[#FFF7ED] p-2 rounded-xs border border-[#FED7AA]">
                    <div className="absolute left-1.5 top-2 w-3 h-3 rounded-full bg-[#EA580C] border-2 border-white animate-pulse" />
                    <div>
                      <div className="text-[10px] font-bold uppercase text-[#EA580C] font-data">2. Skill Gap Deficit ({selectedCapability.skillGap}%)</div>
                      <div className="text-[11px] text-[#9A3412] mt-0.5">{selectedCapability.gapDetails}</div>
                    </div>
                  </div>

                  <div className="relative flex items-start gap-2.5 pl-6">
                    <div className="absolute left-1.5 top-1 w-3 h-3 rounded-full bg-[#2563EB] border-2 border-white" />
                    <div>
                      <div className="text-[10px] font-bold uppercase text-[#64748B] font-data">3. Industry Demand</div>
                      <div className="text-sm font-bold text-[#2563EB]">{selectedCapability.industryDemand.toLocaleString()} Openings</div>
                    </div>
                  </div>

                  <div className="relative flex items-start gap-2.5 pl-6">
                    <div className="absolute left-1.5 top-1 w-3 h-3 rounded-full bg-[#10B981] border-2 border-white" />
                    <div>
                      <div className="text-[10px] font-bold uppercase text-[#059669] font-data">4. Strategic Opportunity</div>
                      <div className="text-xs text-[#0F172A] mt-0.5 leading-relaxed">{selectedCapability.opportunity}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Career Path */}
              <div className="bg-[#F2F1EE] border border-[#E5E2DC] p-3 rounded-xs">
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#0F172A] font-data mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5 text-[#0F172A]" />
                    <span>Career Pathway</span>
                  </span>
                  <span className="text-[10px] font-bold text-[#059669] font-data">{selectedCapability.careerPath.avgStartingSalary}</span>
                </div>
                <div className="text-xs font-semibold text-[#0F172A] mb-1">
                  Roles: {selectedCapability.careerPath.targetRoles.join(', ')}
                </div>
                <div className="p-2 bg-white rounded-xs border border-[#E5E2DC] text-[10px] font-data text-[#0F172A]">
                  → {selectedCapability.careerPath.pathwayDescription}
                </div>
              </div>

              {/* Connected Nodes */}
              <div className="p-2.5 bg-white border border-[#E5E2DC] rounded-xs">
                <div className="text-[9px] font-bold uppercase tracking-widest text-[#64748B] font-data mb-1.5">
                  Connected Corridors ({selectedCapability.connectedNodes.length})
                </div>
                <div className="flex flex-wrap gap-1">
                  {selectedCapability.connectedNodes.map(connectedId => {
                    const connNode = PROTOTYPE_CAPABILITY_NODES.find(n => n.id === connectedId);
                    if (!connNode) return null;
                    return (
                      <button
                        key={connectedId}
                        type="button"
                        onClick={() => handleSelectNode(connNode)}
                        className="px-2 py-1 bg-[#F2F1EE] hover:bg-[#E2DCD2] border border-[#E5E2DC] text-[9px] font-data font-semibold text-[#0F172A] rounded-xs transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <ArrowRight className="w-2.5 h-2.5 text-[#2563EB]" />
                        <span>{connNode.shortName}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E5E2DC] mt-3 flex items-center justify-between">
              <span className="text-[10px] font-data text-[#64748B] uppercase">
                LAT: {selectedCapability.lat.toFixed(3)}°N, LNG: {selectedCapability.lng.toFixed(3)}°E
              </span>
              <button
                type="button"
                onClick={handleResetMap}
                className="px-4 py-2 bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-colors shadow-2xs cursor-pointer font-data"
              >
                Close Drawer
              </button>
            </div>
          </div>
        )}

        {/* Bottom Left Live Geographic Indicator */}
        <div className="absolute bottom-3 left-3 z-20 flex items-center gap-2 bg-white/95 backdrop-blur-md px-2.5 py-1.5 rounded-xs border border-[#E5E2DC] text-[10px] text-[#0F172A] font-data shadow-2xs pointer-events-none">
          <div className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
          <span>Nagpur Regional Base: <strong>{matchingCount} Geocoded Hotspots Active</strong></span>
        </div>
      </div>
    </div>
  );
};
