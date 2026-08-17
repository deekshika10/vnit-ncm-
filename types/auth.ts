import { SectorCategory } from './index';

export type UserRole = 'student' | 'recruiter' | 'dean' | 'industry';

export interface BaseUser {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: UserRole;
  createdAt: string;
  location: string;
}

export interface StudentProfile extends BaseUser {
  role: 'student';
  college: string;
  degree: string;
  branch: string;
  year: '1st Year' | '2nd Year' | '3rd Year' | '4th Year' | 'Postgraduate' | 'Alumni';
  graduationYear: number;
  skills: Array<{ name: string; level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'; category: string }>;
  interests: string[];
  careerInterests: string[];
  targetSectors: SectorCategory[];
  targetLocations: string[];
  assessmentStatus: 'not_started' | 'in_progress' | 'completed';
  assessmentResult?: SkillAssessmentResult;
  profileCompletion: number; // e.g. 72
  documents: VaultDocument[];
  savedOpportunities: string[]; // opportunity IDs
}

export interface RecruiterProfile extends BaseUser {
  role: 'recruiter';
  organization: string;
  orgType: 'Aerospace & Defence' | 'IT / SaaS' | 'EV & Automotive' | 'Healthcare' | 'Logistics' | 'AgriTech' | 'Staffing & Consulting';
  designation: string;
  clusterLocation: string; // e.g. MIHAN SEZ, Hingna, Butibori
  activeRequisitionsCount: number;
}

export interface DeanProfile extends BaseUser {
  role: 'dean';
  institution: string;
  department: string;
  designation: string; // e.g. Dean of Academics, Head of Placement & TPO
  totalStudentsAssessed: number;
  cohortYear: string;
}

export interface IndustryProfile extends BaseUser {
  role: 'industry';
  companyName: string;
  sector: SectorCategory;
  facilityLocation: string; // e.g. Butibori Heavy Industrial Estate
  workforceScale: string;
  rndCollaborationsCount: number;
}

export type UserProfile = StudentProfile | RecruiterProfile | DeanProfile | IndustryProfile;

// ==========================================
// Skill Assessment Types
// ==========================================
export interface SkillAssessmentOption {
  text: string;
  score: {
    technical: number;
    problemSolving: number;
    communication: number;
    design: number;
    leadership: number;
    industryAlignment: number;
  };
  explanation?: string;
}

export interface SkillAssessmentQuestion {
  id: number;
  category: 'Technical' | 'Problem Solving' | 'Communication' | 'Design' | 'Leadership' | 'Industry Alignment';
  question: string;
  context: string;
  options: SkillAssessmentOption[];
}

export interface SkillAssessmentResult {
  completedAt: string;
  categoryScores: {
    category: string;
    score: number; // 0 - 100
    maxScore: number;
    level: 'Emerging' | 'Developing' | 'Proficient' | 'Advanced';
    description: string;
  }[];
  overallReadiness: number; // 0 - 100
  strengths: string[];
  skillGaps: {
    skill: string;
    userLevel: 'Needs Development' | 'Developing' | 'Strong';
    industryDemandLevel: 'High Demand' | 'Critical Shortage' | 'Steady Growth';
    localCluster: string;
    gapDescription: string;
  }[];
  recommendedNextSkills: {
    skill: string;
    category: string;
    impact: string;
    relatedHotspotId: string;
    localTrainingAnchor: string;
    estimatedTime: string;
  }[];
}

// ==========================================
// Document Vault Types
// ==========================================
export type VaultDocumentCategory = 
  | 'Resume' 
  | 'Certificates' 
  | 'Projects' 
  | 'Portfolio' 
  | 'Academic Documents';

export interface VaultDocument {
  id: string;
  name: string;
  category: VaultDocumentCategory;
  fileType: string;
  fileSize: string;
  uploadDate: string;
  isVerified: boolean;
  tags: string[];
}

// ==========================================
// Opportunities Types
// ==========================================
export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  orgType: string;
  logoText: string;
  sector: SectorCategory;
  location: string;
  capabilityHotspotId: string;
  capabilityHotspotName: string;
  type: 'Full-time' | 'Internship' | 'Apprenticeship' | 'Research Fellowship';
  stipendOrSalary: string;
  requiredSkills: string[];
  matchScore?: number;
  description: string;
  deadline: string;
  applicantsCount: number;
  featured?: boolean;
}

// ==========================================
// Recruiter Candidate Profile
// ==========================================
export interface CandidateProfile {
  id: string;
  name: string;
  avatarUrl: string;
  college: string;
  degree: string;
  branch: string;
  graduationYear: number;
  verifiedSkills: string[];
  assessmentScore: number;
  matchScore: number;
  preferredCorridor: string;
  targetSector: SectorCategory;
  readinessStatus: 'Ready for Interview' | 'Assessment Verified' | 'Upskilling in Progress';
}
