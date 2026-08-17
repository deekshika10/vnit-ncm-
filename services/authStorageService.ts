import { UserProfile, StudentProfile, RecruiterProfile, DeanProfile, IndustryProfile, UserRole } from '../types/auth';
import { 
  DEMO_STUDENT_PROFILE, 
  DEMO_RECRUITER_PROFILE, 
  DEMO_DEAN_PROFILE, 
  DEMO_INDUSTRY_PROFILE 
} from '../data/authDemoData';

// Application Document Interface
export interface ApplicationRecord {
  id: string;
  studentUid: string;
  studentName: string;
  opportunityId: string;
  opportunityTitle: string;
  organization: string;
  orgType?: string;
  location?: string;
  stipendOrSalary?: string;
  status: 'Applied' | 'Under Review' | 'Shortlisted' | 'Accepted' | 'Declined';
  appliedAt: string;
  timestamp: number;
}

const STORAGE_KEYS = {
  CURRENT_USER: 'ncm_current_user_session',
  USERS_DB: 'ncm_users_directory',
  APPLICATIONS_DB: 'ncm_applications_registry',
  PASSWORDS_MAP: 'ncm_auth_creds_registry'
};

// Initialize seed database if empty
function initializeSeedData(): void {
  try {
    const existingUsers = localStorage.getItem(STORAGE_KEYS.USERS_DB);
    if (!existingUsers) {
      const seedUsers: Record<string, UserProfile> = {
        [DEMO_STUDENT_PROFILE.id]: DEMO_STUDENT_PROFILE,
        [DEMO_RECRUITER_PROFILE.id]: DEMO_RECRUITER_PROFILE,
        [DEMO_DEAN_PROFILE.id]: DEMO_DEAN_PROFILE,
        [DEMO_INDUSTRY_PROFILE.id]: DEMO_INDUSTRY_PROFILE,
      };
      localStorage.setItem(STORAGE_KEYS.USERS_DB, JSON.stringify(seedUsers));
    }

    const existingApps = localStorage.getItem(STORAGE_KEYS.APPLICATIONS_DB);
    if (!existingApps) {
      const seedApps: ApplicationRecord[] = [
        {
          id: 'app-seed-01',
          studentUid: DEMO_STUDENT_PROFILE.id,
          studentName: DEMO_STUDENT_PROFILE.name,
          opportunityId: 'opp-1',
          opportunityTitle: 'Avionics MRO Systems Trainee',
          organization: 'Air India / Boeing MRO Nagpur',
          orgType: 'Aerospace & Defence',
          location: 'MIHAN SEZ Hangar 3',
          stipendOrSalary: '₹42,000 / mo',
          status: 'Under Review',
          appliedAt: '12 Aug 2026',
          timestamp: Date.now() - 5 * 24 * 60 * 60 * 1000
        },
        {
          id: 'app-seed-02',
          studentUid: DEMO_STUDENT_PROFILE.id,
          studentName: DEMO_STUDENT_PROFILE.name,
          opportunityId: 'opp-2',
          opportunityTitle: 'Battery Telemetry & BMS Engineer',
          organization: 'Pinnacle Mobility Solutions (EKA)',
          orgType: 'EV & Mobility',
          location: 'Butibori Industrial Hub',
          stipendOrSalary: '₹38,000 / mo',
          status: 'Applied',
          appliedAt: '14 Aug 2026',
          timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000
        }
      ];
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS_DB, JSON.stringify(seedApps));
    }
  } catch (err) {
    console.warn('LocalStorage unavailable or restricted:', err);
  }
}

// Run initial seed check
initializeSeedData();

// Get all stored users
export function getAllUsers(): Record<string, UserProfile> {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USERS_DB);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.error('Error fetching users:', err);
  }
  return {
    [DEMO_STUDENT_PROFILE.id]: DEMO_STUDENT_PROFILE,
    [DEMO_RECRUITER_PROFILE.id]: DEMO_RECRUITER_PROFILE,
    [DEMO_DEAN_PROFILE.id]: DEMO_DEAN_PROFILE,
    [DEMO_INDUSTRY_PROFILE.id]: DEMO_INDUSTRY_PROFILE,
  };
}

// Get user by email
export function getUserByEmail(email: string): UserProfile | null {
  const users = getAllUsers();
  const normalized = email.trim().toLowerCase();
  for (const user of Object.values(users)) {
    if (user.email.toLowerCase() === normalized) {
      return user;
    }
  }
  return null;
}

// Save or Update User Profile
export function saveUserProfile(profile: UserProfile): void {
  try {
    const users = getAllUsers();
    users[profile.id] = profile;
    localStorage.setItem(STORAGE_KEYS.USERS_DB, JSON.stringify(users));

    // If current session is this user, update session as well
    const currentSession = getActiveSession();
    if (currentSession && currentSession.id === profile.id) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(profile));
    }
  } catch (err) {
    console.error('Error saving user profile:', err);
  }
}

// Active session management
export function getActiveSession(): UserProfile | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (raw) {
      const user = JSON.parse(raw) as UserProfile;
      // Refresh from users DB to pick up any latest changes
      const users = getAllUsers();
      return users[user.id] || user;
    }
  } catch (err) {
    console.error('Error reading active session:', err);
  }
  return null;
}

export function setActiveSession(user: UserProfile): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  } catch (err) {
    console.error('Error setting active session:', err);
  }
}

export function clearActiveSession(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  } catch (err) {
    console.error('Error clearing active session:', err);
  }
}

// Register a new user
export interface RegistrationInput {
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  collegeOrOrg?: string;
  degreeOrDept?: string;
  branch?: string;
  year?: string;
  sector?: string;
  locationArea?: string;
}

export function registerNewUser(input: RegistrationInput): UserProfile {
  const uid = `user_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
  const now = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const location = input.locationArea || 'Nagpur, Maharashtra';

  let newProfile: UserProfile;

  if (input.role === 'student') {
    newProfile = {
      id: uid,
      name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
      avatarUrl: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`,
      role: 'student',
      createdAt: now,
      location,
      college: input.collegeOrOrg || 'Visvesvaraya National Institute of Technology (VNIT), Nagpur',
      degree: input.degreeOrDept || 'B.Tech / Engineering',
      branch: input.branch || 'Computer Science & Engineering',
      year: (input.year as any) || '3rd Year',
      graduationYear: 2027,
      skills: [
        { name: 'Python', level: 'Intermediate', category: 'Programming' },
        { name: 'Data Structures', level: 'Intermediate', category: 'Computer Science' },
        { name: 'Cloud Basics', level: 'Beginner', category: 'Infrastructure' }
      ],
      interests: ['Aerospace Software', 'Autonomous Systems', 'Central India Tech Corridors'],
      careerInterests: ['Software Development Engineer', 'Cloud Systems Specialist'],
      targetSectors: ['IT & Cloud', 'Aerospace & Defence'],
      targetLocations: ['MIHAN SEZ', 'Gayatri Nagar IT Park'],
      assessmentStatus: 'not_started',
      profileCompletion: 45,
      documents: [],
      savedOpportunities: []
    } as StudentProfile;
  } else if (input.role === 'recruiter') {
    newProfile = {
      id: uid,
      name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
      avatarUrl: `https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80`,
      role: 'recruiter',
      createdAt: now,
      location,
      organization: input.collegeOrOrg || 'Nagpur Tech Enterprises',
      orgType: 'IT / SaaS',
      designation: 'Talent Acquisition Lead',
      clusterLocation: 'MIHAN SEZ Corridor',
      activeRequisitionsCount: 4
    } as RecruiterProfile;
  } else if (input.role === 'dean') {
    newProfile = {
      id: uid,
      name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
      avatarUrl: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80`,
      role: 'dean',
      createdAt: now,
      location,
      institution: input.collegeOrOrg || 'VNIT Nagpur',
      department: input.degreeOrDept || 'Academic Affairs & Curriculum Development',
      designation: 'Dean of Academics & Industry Linkages',
      totalStudentsAssessed: 1420,
      cohortYear: '2026-2027'
    } as DeanProfile;
  } else {
    newProfile = {
      id: uid,
      name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
      avatarUrl: `https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80`,
      role: 'industry',
      createdAt: now,
      location,
      companyName: input.collegeOrOrg || 'Nagpur Industrial Consortium',
      sector: 'Aerospace & Defence',
      facilityLocation: 'MIHAN Special Economic Zone',
      workforceScale: '250+ Engineers',
      rndCollaborationsCount: 6
    } as IndustryProfile;
  }

  saveUserProfile(newProfile);
  setActiveSession(newProfile);
  return newProfile;
}

// Applications Management
export function getAllApplications(): ApplicationRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.APPLICATIONS_DB);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.error('Error fetching applications:', err);
  }
  return [];
}

export function getStudentApplications(studentUid: string): ApplicationRecord[] {
  const all = getAllApplications();
  return all.filter(a => a.studentUid === studentUid);
}

export function hasStudentApplied(studentUid: string, opportunityId: string): boolean {
  const studentApps = getStudentApplications(studentUid);
  return studentApps.some(a => a.opportunityId === opportunityId);
}

export function submitApplication(
  student: UserProfile, 
  opportunity: {
    id: string;
    title: string;
    organization: string;
    orgType?: string;
    location?: string;
    stipendOrSalary?: string;
  }
): { success: boolean; application?: ApplicationRecord; message: string } {
  if (hasStudentApplied(student.id, opportunity.id)) {
    return {
      success: false,
      message: 'You have already applied for this opportunity.'
    };
  }

  const newApp: ApplicationRecord = {
    id: `app_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    studentUid: student.id,
    studentName: student.name,
    opportunityId: opportunity.id,
    opportunityTitle: opportunity.title,
    organization: opportunity.organization,
    orgType: opportunity.orgType,
    location: opportunity.location,
    stipendOrSalary: opportunity.stipendOrSalary,
    status: 'Applied',
    appliedAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    timestamp: Date.now()
  };

  try {
    const all = getAllApplications();
    const updated = [newApp, ...all];
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS_DB, JSON.stringify(updated));
    return {
      success: true,
      application: newApp,
      message: 'Application submitted successfully! ✓'
    };
  } catch (err) {
    console.error('Error submitting application:', err);
    return {
      success: false,
      message: 'Failed to record application. Please try again.'
    };
  }
}
