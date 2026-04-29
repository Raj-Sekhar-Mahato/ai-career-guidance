import { motion } from "framer-motion";
import { Monitor, Server, Database, Lock, Layers } from "lucide-react";
import SectionHeading from "./SectionHeading";

const layers = [
  { icon: Monitor, title: "Frontend Layer", items: ["Registration & Login Pages", "Skill Assessment Form", "Career Results Page", "Admin Dashboard"], color: "text-primary" },
  { icon: Server, title: "Backend Logic", items: ["PHP / Python Flask", "RESTful API Endpoints", "Session Management", "Weighted Scoring Engine"], color: "text-accent" },
  { icon: Database, title: "Database Layer", items: ["MySQL Database", "Users & Profiles", "Skills & Career Paths", "Recommendation Results"], color: "text-primary" },
  { icon: Lock, title: "Security Layer", items: ["Password Hashing", "Role-Based Access", "Input Validation", "Secure Sessions"], color: "text-accent" },
];

const ArchitectureSection = () => (
  <section id="architecture" className="py-24 relative">
    <div className="absolute inset-0 bg-grid opacity-10" />
    <div className="container mx-auto px-6 relative z-10">
      <SectionHeading title="System Architecture" subtitle="A layered architecture ensuring scalability, security, and clean separation of concerns." />
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {layers.map((layer, i) => {
          const Icon = layer.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-gradient border border-border rounded-xl p-6 hover:border-primary/30 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Icon className={`w-6 h-6 ${layer.color}`} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">{layer.title}</h3>
              <ul className="space-y-2">
                {layer.items.map((item, j) => (
                  <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                    <Layers className="w-3 h-3 text-primary mt-1 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default ArchitectureSection;
