import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserRole = "student" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface StudentProfile {
  userId: string;
  marks: { subject: string; score: number }[];
  skills: string[];
  interests: string[];
  education: string;
  recommendations?: CareerRecommendation[];
}

export interface CareerRecommendation {
  career: string;
  score: number;
  description: string;
  matchedSkills: string[];
  matchedInterests: string[];
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  getProfile: (userId: string) => StudentProfile | null;
  saveProfile: (profile: StudentProfile) => void;
  getAllStudents: () => User[];
  getAllProfiles: () => StudentProfile[];
}

const AuthContext = createContext<AuthContextType | null>(null);

const CAREER_DATABASE = [
  { career: "Software Engineer", skills: ["programming", "problem solving", "algorithms", "data structures", "python", "java", "javascript", "c++", "coding"], interests: ["technology", "computers", "software", "coding", "development", "ai"], description: "Design, develop, and maintain software systems and applications." },
  { career: "Data Scientist", skills: ["python", "statistics", "machine learning", "data analysis", "sql", "mathematics", "r", "deep learning"], interests: ["data", "analytics", "ai", "research", "patterns", "mathematics"], description: "Analyze complex data to help organizations make better decisions." },
  { career: "UI/UX Designer", skills: ["design", "figma", "creativity", "prototyping", "user research", "wireframing", "photoshop", "illustrator"], interests: ["design", "art", "user experience", "creativity", "visual", "aesthetics"], description: "Create intuitive and visually appealing user interfaces." },
  { career: "Cybersecurity Analyst", skills: ["networking", "security", "linux", "encryption", "ethical hacking", "firewalls", "incident response"], interests: ["security", "hacking", "privacy", "protection", "forensics"], description: "Protect organizations from cyber threats and vulnerabilities." },
  { career: "Cloud Architect", skills: ["aws", "azure", "devops", "docker", "kubernetes", "networking", "linux", "terraform"], interests: ["cloud", "infrastructure", "scalability", "technology", "servers"], description: "Design and manage cloud computing infrastructure." },
  { career: "Mobile App Developer", skills: ["react native", "flutter", "swift", "kotlin", "javascript", "ui design", "api integration"], interests: ["mobile", "apps", "technology", "smartphones", "development"], description: "Build applications for iOS and Android platforms." },
  { career: "Machine Learning Engineer", skills: ["python", "tensorflow", "pytorch", "mathematics", "deep learning", "nlp", "computer vision"], interests: ["ai", "machine learning", "automation", "research", "neural networks"], description: "Build and deploy machine learning models at scale." },
  { career: "Database Administrator", skills: ["sql", "mysql", "postgresql", "mongodb", "optimization", "backup", "security"], interests: ["databases", "data management", "organization", "backend", "infrastructure"], description: "Manage and optimize database systems for performance and security." },
  { career: "Web Developer", skills: ["html", "css", "javascript", "react", "node.js", "php", "responsive design"], interests: ["web", "internet", "design", "frontend", "websites", "development"], description: "Build and maintain websites and web applications." },
  { career: "AI Research Scientist", skills: ["mathematics", "python", "deep learning", "research", "publications", "nlp", "statistics"], interests: ["ai", "research", "innovation", "science", "breakthrough", "academia"], description: "Push the boundaries of artificial intelligence through research." },
  { career: "DevOps Engineer", skills: ["linux", "docker", "ci/cd", "kubernetes", "aws", "scripting", "monitoring"], interests: ["automation", "infrastructure", "deployment", "efficiency", "systems"], description: "Streamline software development and deployment processes." },
  { career: "Product Manager", skills: ["communication", "leadership", "analytics", "strategy", "agile", "user research"], interests: ["business", "strategy", "products", "leadership", "management", "innovation"], description: "Define product vision and coordinate teams to deliver value." },
];

function generateRecommendations(profile: StudentProfile): CareerRecommendation[] {
  const userSkills = profile.skills.map(s => s.toLowerCase().trim());
  const userInterests = profile.interests.map(i => i.toLowerCase().trim());
  const avgMarks = profile.marks.length > 0
    ? profile.marks.reduce((sum, m) => sum + m.score, 0) / profile.marks.length
    : 50;

  const scored = CAREER_DATABASE.map(career => {
    const matchedSkills = career.skills.filter(s => userSkills.some(us => s.includes(us) || us.includes(s)));
    const matchedInterests = career.interests.filter(i => userInterests.some(ui => i.includes(ui) || ui.includes(i)));
    
    const skillScore = career.skills.length > 0 ? (matchedSkills.length / career.skills.length) * 40 : 0;
    const interestScore = career.interests.length > 0 ? (matchedInterests.length / career.interests.length) * 30 : 0;
    const marksScore = (avgMarks / 100) * 30;

    return {
      career: career.career,
      score: Math.round(skillScore + interestScore + marksScore),
      description: career.description,
      matchedSkills,
      matchedInterests,
    };
  });

  return scored.sort((a, b) => b.score - a.score).slice(0, 5);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("careerai_user");
    if (stored) setUser(JSON.parse(stored));
    setIsLoading(false);
  }, []);

  const hashPassword = async (password: string): Promise<string> => {
    const msgBuffer = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    const users: (User & { password: string })[] = JSON.parse(localStorage.getItem("careerai_users") || "[]");
    const hashed = await hashPassword(password);
    const found = users.find(u => u.email === email && u.password === hashed);
    if (found) {
      const { password: _, ...userData } = found;
      setUser(userData);
      localStorage.setItem("careerai_user", JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const register = async (name: string, email: string, password: string, role: UserRole): Promise<boolean> => {
    const users: (User & { password: string })[] = JSON.parse(localStorage.getItem("careerai_users") || "[]");
    if (users.find(u => u.email === email)) return false;
    const hashed = await hashPassword(password);
    const newUser = { id: crypto.randomUUID(), name, email, password: hashed, role };
    users.push(newUser);
    localStorage.setItem("careerai_users", JSON.stringify(users));
    const { password: _, ...userData } = newUser;
    setUser(userData);
    localStorage.setItem("careerai_user", JSON.stringify(userData));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("careerai_user");
  };

  const getProfile = (userId: string): StudentProfile | null => {
    const profiles: StudentProfile[] = JSON.parse(localStorage.getItem("careerai_profiles") || "[]");
    return profiles.find(p => p.userId === userId) || null;
  };

  const saveProfile = (profile: StudentProfile) => {
    const profiles: StudentProfile[] = JSON.parse(localStorage.getItem("careerai_profiles") || "[]");
    const idx = profiles.findIndex(p => p.userId === profile.userId);
    profile.recommendations = generateRecommendations(profile);
    if (idx >= 0) profiles[idx] = profile;
    else profiles.push(profile);
    localStorage.setItem("careerai_profiles", JSON.stringify(profiles));
  };

  const getAllStudents = (): User[] => {
    const users: User[] = JSON.parse(localStorage.getItem("careerai_users") || "[]");
    return users.filter(u => u.role === "student");
  };

  const getAllProfiles = (): StudentProfile[] => {
    return JSON.parse(localStorage.getItem("careerai_profiles") || "[]");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, getProfile, saveProfile, getAllStudents, getAllProfiles }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};
