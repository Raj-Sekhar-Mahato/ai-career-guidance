import { motion } from "framer-motion";
import { Globe, Server, Database, Wrench, ShieldCheck } from "lucide-react";
import SectionHeading from "./SectionHeading";

const stack = [
  { icon: Globe, label: "Frontend", tech: "HTML, CSS, JS, Bootstrap" },
  { icon: Server, label: "Backend", tech: "PHP / Python Flask" },
  { icon: Database, label: "Database", tech: "MySQL" },
  { icon: Wrench, label: "Tools", tech: "VS Code, XAMPP" },
  { icon: ShieldCheck, label: "Security", tech: "Hashing, Sessions, RBAC" },
];

const TechStackSection = () => (
  <section id="tech" className="py-24">
    <div className="container mx-auto px-6">
      <SectionHeading title="Technology Stack" subtitle="Built with industry-standard tools and frameworks." />
      <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
        {stack.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08, type: "spring" }}
              className="card-gradient border border-border rounded-xl px-6 py-5 flex items-center gap-4 hover:border-primary/30 transition-colors min-w-[220px]"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">{s.label}</p>
                <p className="text-sm font-medium text-foreground">{s.tech}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default TechStackSection;
