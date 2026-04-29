import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Brain, Users, BarChart3, FileText, LogOut, TrendingUp, BookOpen, Target } from "lucide-react";
import { useAuth, User, StudentProfile } from "@/contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const COLORS = ["hsl(200, 80%, 55%)", "hsl(165, 70%, 45%)", "hsl(280, 70%, 55%)", "hsl(30, 80%, 55%)", "hsl(340, 70%, 55%)"];

const AdminDashboard = () => {
  const { user, logout, getAllStudents, getAllProfiles } = useAuth();
  const navigate = useNavigate();
  const [students, setStudents] = useState<User[]>([]);
  const [profiles, setProfiles] = useState<StudentProfile[]>([]);
  const [activeTab, setActiveTab] = useState<"overview" | "students" | "reports">("overview");

  useEffect(() => {
    if (!user || user.role !== "admin") { navigate("/login"); return; }
    setStudents(getAllStudents());
    setProfiles(getAllProfiles());
  }, [user]);

  const handleLogout = () => { logout(); navigate("/"); };

  const avgMarks = profiles.length > 0
    ? Math.round(profiles.flatMap(p => p.marks.map(m => m.score)).reduce((a, b) => a + b, 0) / Math.max(1, profiles.flatMap(p => p.marks).length))
    : 0;

  const allSkills = profiles.flatMap(p => p.skills);
  const skillCounts: Record<string, number> = {};
  allSkills.forEach(s => { skillCounts[s] = (skillCounts[s] || 0) + 1; });
  const topSkills = Object.entries(skillCounts).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([name, count]) => ({ name, count }));

  const allCareers = profiles.flatMap(p => p.recommendations?.map(r => r.career) || []);
  const careerCounts: Record<string, number> = {};
  allCareers.forEach(c => { careerCounts[c] = (careerCounts[c] || 0) + 1; });
  const topCareers = Object.entries(careerCounts).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([name, value]) => ({ name, value }));

  if (!user || user.role !== "admin") return null;

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-foreground font-bold">
            <Brain className="w-6 h-6 text-primary" /> <span className="hidden sm:inline">CareerAI Admin</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:inline">Admin: {user.name}</span>
            <button onClick={handleLogout} className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground transition-all">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-12 container mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground text-sm">Monitor students, profiles, and career recommendations.</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {[
            { key: "overview" as const, icon: BarChart3, label: "Overview" },
            { key: "students" as const, icon: Users, label: "Students" },
            { key: "reports" as const, icon: FileText, label: "Reports" },
          ].map(t => (
            <button key={t.key} onClick={() => setActiveTab(t.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === t.key ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
            >
              <t.icon className="w-4 h-4" /> {t.label}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Total Students", value: students.length, icon: Users, color: "text-primary" },
                { label: "Profiles Created", value: profiles.length, icon: BookOpen, color: "text-accent" },
                { label: "Avg. Marks", value: `${avgMarks}%`, icon: TrendingUp, color: "text-primary" },
                { label: "Skills Tracked", value: allSkills.length, icon: Target, color: "text-accent" },
              ].map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                  className="card-gradient border border-border rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                      <s.icon className={`w-4 h-4 ${s.color}`} />
                    </div>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">{s.label}</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">{s.value}</p>
                </motion.div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="card-gradient border border-border rounded-xl p-6">
                <h3 className="text-sm font-semibold text-foreground mb-4">Top Skills Among Students</h3>
                {topSkills.length > 0 ? (
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={topSkills}>
                      <XAxis dataKey="name" tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ background: "hsl(220, 18%, 8%)", border: "1px solid hsl(220, 15%, 16%)", borderRadius: "8px", color: "hsl(210, 20%, 92%)" }} />
                      <Bar dataKey="count" fill="hsl(200, 80%, 55%)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-12">No data yet</p>
                )}
              </div>

              <div className="card-gradient border border-border rounded-xl p-6">
                <h3 className="text-sm font-semibold text-foreground mb-4">Top Recommended Careers</h3>
                {topCareers.length > 0 ? (
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie data={topCareers} cx="50%" cy="50%" innerRadius={50} outerRadius={90} dataKey="value" label={({ name }) => name}>
                        {topCareers.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                      </Pie>
                      <Tooltip contentStyle={{ background: "hsl(220, 18%, 8%)", border: "1px solid hsl(220, 15%, 16%)", borderRadius: "8px", color: "hsl(210, 20%, 92%)" }} />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-12">No data yet</p>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "students" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="card-gradient border border-border rounded-xl overflow-hidden">
              {students.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left px-6 py-3 text-muted-foreground font-medium">Name</th>
                        <th className="text-left px-6 py-3 text-muted-foreground font-medium">Email</th>
                        <th className="text-left px-6 py-3 text-muted-foreground font-medium">Skills</th>
                        <th className="text-left px-6 py-3 text-muted-foreground font-medium">Top Career</th>
                        <th className="text-left px-6 py-3 text-muted-foreground font-medium">Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map(s => {
                        const p = profiles.find(pr => pr.userId === s.id);
                        const topCareer = p?.recommendations?.[0];
                        return (
                          <tr key={s.id} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                            <td className="px-6 py-4 font-medium text-foreground">{s.name}</td>
                            <td className="px-6 py-4 text-muted-foreground">{s.email}</td>
                            <td className="px-6 py-4">
                              <div className="flex flex-wrap gap-1">
                                {(p?.skills || []).slice(0, 3).map(sk => (
                                  <span key={sk} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">{sk}</span>
                                ))}
                                {(p?.skills?.length || 0) > 3 && <span className="text-xs text-muted-foreground">+{p!.skills.length - 3}</span>}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-foreground">{topCareer?.career || "—"}</td>
                            <td className="px-6 py-4">
                              {topCareer ? (
                                <span className="text-xs font-bold px-2 py-1 rounded-full bg-accent/10 text-accent">{topCareer.score}%</span>
                              ) : "—"}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-16">
                  <Users className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground text-sm">No students registered yet.</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === "reports" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="card-gradient border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" /> System Report
              </h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between py-2 border-b border-border/50">
                  <span className="text-muted-foreground">Total Registered Students</span>
                  <span className="font-medium text-foreground">{students.length}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border/50">
                  <span className="text-muted-foreground">Profiles Completed</span>
                  <span className="font-medium text-foreground">{profiles.length}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border/50">
                  <span className="text-muted-foreground">Average Academic Score</span>
                  <span className="font-medium text-foreground">{avgMarks}%</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border/50">
                  <span className="text-muted-foreground">Total Unique Skills</span>
                  <span className="font-medium text-foreground">{new Set(allSkills).size}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border/50">
                  <span className="text-muted-foreground">Most Popular Skill</span>
                  <span className="font-medium text-primary">{topSkills[0]?.name || "N/A"}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Most Recommended Career</span>
                  <span className="font-medium text-accent">{topCareers[0]?.name || "N/A"}</span>
                </div>
              </div>
            </div>

            <div className="card-gradient border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Skills Distribution</h3>
              <div className="space-y-3">
                {topSkills.map((s, i) => (
                  <div key={s.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-foreground">{s.name}</span>
                      <span className="text-muted-foreground">{s.count} student{s.count !== 1 ? "s" : ""}</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(s.count / Math.max(...topSkills.map(x => x.count))) * 100}%` }}
                        transition={{ duration: 0.8, delay: i * 0.1 }}
                        className="h-2 rounded-full bg-primary"
                      />
                    </div>
                  </div>
                ))}
                {topSkills.length === 0 && <p className="text-sm text-muted-foreground text-center py-6">No data available</p>}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
