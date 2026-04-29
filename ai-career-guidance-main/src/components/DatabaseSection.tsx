import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const tables = [
  { name: "Users", fields: ["id", "name", "email", "password", "role"], accent: "border-primary/50" },
  { name: "Student_Profile", fields: ["user_id", "academic_details", "stream", "semester", "cgpa"], accent: "border-accent/50" },
  { name: "Skills", fields: ["programming", "communication", "analytical", "creativity", "management"], accent: "border-primary/50" },
  { name: "Career_Paths", fields: ["career_id", "career_name", "required_skill_profile", "description"], accent: "border-accent/50" },
  { name: "Recommendations", fields: ["user_id", "recommended_career", "score", "timestamp"], accent: "border-primary/50" },
];

const DatabaseSection = () => (
  <section id="database" className="py-24">
    <div className="container mx-auto px-6">
      <SectionHeading title="Database Design" subtitle="Relational schema with five interconnected tables powering the recommendation engine." />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {tables.map((table, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className={`card-gradient border-l-4 ${table.accent} border border-border rounded-xl p-5 hover:glow-box transition-shadow`}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-mono px-2 py-1 rounded bg-primary/10 text-primary">TABLE</span>
              <h3 className="font-semibold text-foreground">{table.name}</h3>
            </div>
            <div className="space-y-1.5">
              {table.fields.map((field, j) => (
                <div key={j} className="text-sm text-muted-foreground font-mono flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                  {field}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default DatabaseSection;
