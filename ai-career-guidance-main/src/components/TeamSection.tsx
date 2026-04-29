import { motion } from "framer-motion";
import { Code2, DatabaseZap } from "lucide-react";
import SectionHeading from "./SectionHeading";

const members = [
  {
    name: "Khushi Raut",
    roll: "Frontend Developer & UX Lead",
    role: "Frontend Developer & UX Lead",
    extra: "Handles UI/UX and frontend implementation",
    icon: Code2,
  },
  {
    name: "Nivedita Kumari",
    roll: "Database Design & System Logic",
    role: "Database Design & System Logic",
    extra: "Architecture and recommendation engine",
    icon: DatabaseZap,
  },
  {
    name: "Rajsekhar Mahato",
    roll: "Backend Developer",
    role: "Backend Developer",
    extra: "Responsible for backend development and APIs",
    icon: Code2,
  },
];

const TeamSection = () => (
  <section id="team" className="py-24">
    <div className="container mx-auto px-6">
      <SectionHeading title="Team Members" subtitle="Section A — Semester 6" />
      <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        {members.map((m, i) => {
          const Icon = m.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="card-gradient border border-border rounded-2xl p-8 text-center hover:border-primary/40 transition-all glow-box group"
            >
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform">
                <Icon className="w-9 h-9 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-1">{m.name}</h3>
              <p className="text-xs font-mono text-muted-foreground mb-3">{m.roll}</p>
              <p className="text-primary font-medium text-sm mb-1">{m.role}</p>
              <p className="text-muted-foreground text-xs">{m.extra}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default TeamSection;
