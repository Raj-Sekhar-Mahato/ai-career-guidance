import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Plus, X, Save, Sparkles, BookOpen, Target, Star, LogOut, ArrowLeft, Trophy, TrendingUp } from "lucide-react";
import { useAuth, StudentProfile } from "@/contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";

const SKILL_SUGGESTIONS = ["Python", "Java", "JavaScript", "C++", "SQL", "HTML", "CSS", "React", "Machine Learning", "Data Analysis", "Design", "Communication", "Leadership", "Problem Solving", "Networking", "Linux", "Docker", "AWS"];
const INTEREST_SUGGESTIONS = ["Technology", "AI", "Web Development", "Mobile Apps", "Data Science", "Cybersecurity", "Cloud Computing", "Design", "Research", "Business", "Gaming", "Robotics"];

const StudentDashboard = () => {
  const { user, logout, getProfile, saveProfile } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"profile" | "recommendations">("profile");
  const [marks, setMarks] = useState<{ subject: string; score: number }[]>([
    { subject: "Mathematics", score: 85 },
    { subject: "Computer Science", score: 90 },
    { subject: "English", score: 78 },
  ]);
  const [skills, setSkills] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [education, setEducation] = useState("");
  const [newSkill, setNewSkill] = useState("");
  const [newInterest, setNewInterest] = useState("");
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    const p = getProfile(user.id);
    if (p) {
      setMarks(p.marks.length ? p.marks : marks);
      setSkills(p.skills);
      setInterests(p.interests);
      setEducation(p.education);
      setProfile(p);
    }
  }, [user]);

  const handleSave = () => {
    if (!user) return;
    setSaving(true);
    const p: StudentProfile = { userId: user.id, marks, skills, interests, education };
    saveProfile(p);
    const updated = getProfile(user.id);
    setProfile(updated);
    setTimeout(() => {
      setSaving(false);
      toast.success("Profile saved! Career recommendations updated.");
      setActiveTab("recommendations");
    }, 800);
  };

  const addMark = () => setMarks([...marks, { subject: "", score: 0 }]);
  const removeMark = (i: number) => setMarks(marks.filter((_, idx) => idx !== i));
  const updateMark = (i: number, field: "subject" | "score", value: string | number) => {
    const updated = [...marks];
    if (field === "subject") updated[i].subject = value as string;
    else updated[i].score = Math.min(100, Math.max(0, Number(value)));
    setMarks(updated);
  };

  const addSkill = (s: string) => {
    const trimmed = s.trim();
    if (trimmed && !skills.includes(trimmed)) { setSkills([...skills, trimmed]); setNewSkill(""); }
  };
  const addInterest = (i: string) => {
    const trimmed = i.trim();
    if (trimmed && !interests.includes(trimmed)) { setInterests([...interests, trimmed]); setNewInterest(""); }
  };

  const handleLogout = () => { logout(); navigate("/"); };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-foreground font-bold">
            <Brain className="w-6 h-6 text-primary" />
            <span className="hidden sm:inline">CareerAI</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:inline">Hi, {user.name}</span>
            <button onClick={handleLogout} className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-12 container mx-auto px-4 sm:px-6 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Student Dashboard</h1>
          <p className="text-muted-foreground text-sm">Enter your details to get AI-powered career recommendations.</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {[{ key: "profile" as const, icon: BookOpen, label: "My Profile" }, { key: "recommendations" as const, icon: Sparkles, label: "Recommendations" }].map(t => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === t.key ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              <t.icon className="w-4 h-4" /> {t.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "profile" ? (
            <motion.div key="profile" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-6">
              {/* Education */}
              <div className="card-gradient border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-4">
                  <BookOpen className="w-5 h-5 text-primary" /> Education
                </h3>
                <input
                  type="text"
                  value={education}
                  onChange={e => setEducation(e.target.value)}
                  placeholder="e.g., B.Tech Computer Science, NSU"
                  className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              {/* Marks */}
              <div className="card-gradient border border-border rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <Star className="w-5 h-5 text-primary" /> Academic Marks
                  </h3>
                  <button onClick={addMark} className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                    <Plus className="w-3 h-3" /> Add Subject
                  </button>
                </div>
                <div className="space-y-3">
                  {marks.map((m, i) => (
                    <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 items-center">
                      <input
                        type="text"
                        value={m.subject}
                        onChange={e => updateMark(i, "subject", e.target.value)}
                        placeholder="Subject name"
                        className="flex-1 px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                      <input
                        type="number"
                        value={m.score}
                        onChange={e => updateMark(i, "score", e.target.value)}
                        min={0}
                        max={100}
                        className="w-20 px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm text-center focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                      <button onClick={() => removeMark(i)} className="text-muted-foreground hover:text-destructive transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="card-gradient border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-4">
                  <Target className="w-5 h-5 text-primary" /> Skills
                </h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {skills.map(s => (
                    <span key={s} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20">
                      {s}
                      <button onClick={() => setSkills(skills.filter(x => x !== s))}><X className="w-3 h-3" /></button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={e => setNewSkill(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && addSkill(newSkill)}
                    placeholder="Type a skill..."
                    className="flex-1 px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <button onClick={() => addSkill(newSkill)} className="px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm hover:bg-primary/20 transition-colors">Add</button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {SKILL_SUGGESTIONS.filter(s => !skills.includes(s)).slice(0, 8).map(s => (
                    <button key={s} onClick={() => addSkill(s)} className="text-xs px-2.5 py-1 rounded-full border border-border text-muted-foreground hover:border-primary/30 hover:text-primary transition-colors">
                      + {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interests */}
              <div className="card-gradient border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-primary" /> Interests
                </h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {interests.map(i => (
                    <span key={i} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium border border-accent/20">
                      {i}
                      <button onClick={() => setInterests(interests.filter(x => x !== i))}><X className="w-3 h-3" /></button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newInterest}
                    onChange={e => setNewInterest(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && addInterest(newInterest)}
                    placeholder="Type an interest..."
                    className="flex-1 px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <button onClick={() => addInterest(newInterest)} className="px-4 py-2 rounded-lg bg-accent/10 text-accent text-sm hover:bg-accent/20 transition-colors">Add</button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {INTEREST_SUGGESTIONS.filter(i => !interests.includes(i)).slice(0, 8).map(i => (
                    <button key={i} onClick={() => addInterest(i)} className="text-xs px-2.5 py-1 rounded-full border border-border text-muted-foreground hover:border-accent/30 hover:text-accent transition-colors">
                      + {i}
                    </button>
                  ))}
                </div>
              </div>

              {/* Save */}
              <motion.button
                onClick={handleSave}
                disabled={saving}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:brightness-110 transition-all glow-box disabled:opacity-50"
              >
                {saving ? (
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                ) : (
                  <><Save className="w-5 h-5" /> Save & Get Recommendations</>
                )}
              </motion.button>
            </motion.div>
          ) : (
            <motion.div key="recommendations" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              {profile?.recommendations?.length ? (
                <div className="space-y-4">
                  <div className="card-gradient border border-border rounded-xl p-6 mb-6">
                    <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-2">
                      <Trophy className="w-5 h-5 text-accent" /> Your Top Career Matches
                    </h3>
                    <p className="text-sm text-muted-foreground">Based on your skills, interests, and academic performance.</p>
                  </div>
                  {profile.recommendations.map((rec, i) => (
                    <motion.div
                      key={rec.career}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="card-gradient border border-border rounded-xl p-6 hover:border-primary/30 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">#{i + 1}</span>
                            <h4 className="font-semibold text-foreground">{rec.career}</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">{rec.description}</p>
                        </div>
                        <div className="flex items-center gap-1 bg-accent/10 px-3 py-1.5 rounded-lg">
                          <TrendingUp className="w-4 h-4 text-accent" />
                          <span className="text-sm font-bold text-accent">{rec.score}%</span>
                        </div>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2 mb-3">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${rec.score}%` }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                          className="h-2 rounded-full"
                          style={{ background: "var(--gradient-primary)" }}
                        />
                      </div>
                      {(rec.matchedSkills.length > 0 || rec.matchedInterests.length > 0) && (
                        <div className="flex flex-wrap gap-1.5">
                          {rec.matchedSkills.map(s => (
                            <span key={s} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">{s}</span>
                          ))}
                          {rec.matchedInterests.map(i => (
                            <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20">{i}</span>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <Sparkles className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No Recommendations Yet</h3>
                  <p className="text-sm text-muted-foreground mb-4">Fill in your profile and save to get career recommendations.</p>
                  <button onClick={() => setActiveTab("profile")} className="px-6 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium">
                    Go to Profile
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StudentDashboard;
