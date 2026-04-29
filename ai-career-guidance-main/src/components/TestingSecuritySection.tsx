import { motion } from "framer-motion";
import { ShieldCheck, TestTube, Lock, Eye, Bug, Server, CheckCircle2 } from "lucide-react";
import SectionHeading from "./SectionHeading";

const testingItems = [
  { icon: TestTube, title: "Unit Testing", desc: "Individual modules tested for correct behavior — form validation, scoring logic, API responses." },
  { icon: Bug, title: "Integration Testing", desc: "End-to-end flow testing from registration through profile creation to career recommendation output." },
  { icon: Eye, title: "UI/UX Testing", desc: "Cross-browser and responsive testing on Chrome, Firefox, Edge, and mobile devices." },
  { icon: Server, title: "Performance Testing", desc: "Load testing for concurrent users, database query optimization, and response time benchmarks." },
];

const securityItems = [
  { icon: Lock, title: "Password Hashing", desc: "SHA-256 / bcrypt hashing for secure password storage — never plain text." },
  { icon: ShieldCheck, title: "Session Management", desc: "PHP sessions with secure cookies, CSRF tokens, and automatic session expiry." },
  { icon: CheckCircle2, title: "Input Validation", desc: "Server-side validation and prepared SQL statements to prevent SQL injection and XSS." },
  { icon: Eye, title: "RBAC Authorization", desc: "Role-Based Access Control separating Student, Admin, and Guest permissions." },
];

const TestingSecuritySection = () => (
  <section id="testing" className="py-24">
    <div className="container mx-auto px-6">
      <SectionHeading title="Testing & Security" subtitle="Ensuring reliability, performance, and protection at every layer." />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Testing */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <TestTube className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Testing Strategy</h3>
          </div>
          <div className="space-y-4">
            {testingItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="card-gradient border border-border rounded-xl p-4 hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-1">{item.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Security */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-accent" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Security Measures</h3>
          </div>
          <div className="space-y-4">
            {securityItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="card-gradient border border-border rounded-xl p-4 hover:border-accent/30 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-1">{item.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default TestingSecuritySection;
