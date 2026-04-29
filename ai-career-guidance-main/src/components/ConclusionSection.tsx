import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const points = [
  "Provides Data-Driven Career Guidance",
  "Helps Students Make Better Career Decisions",
  "Demonstrates Advanced Web Development Concepts",
  "Scalable for Future AI & ML Enhancements",
];

const ConclusionSection = () => (
  <section className="py-24 relative overflow-hidden">
    <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
    <div className="absolute inset-0 bg-grid opacity-10" />
    <div className="container mx-auto px-6 relative z-10 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-5xl font-bold text-gradient mb-12"
      >
        Contribution & Conclusion
      </motion.h2>
      <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto mb-12">
        {points.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="flex items-center gap-3 card-gradient border border-border rounded-lg px-5 py-3"
          >
            <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
            <span className="text-sm text-foreground">{p}</span>
          </motion.div>
        ))}
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="text-muted-foreground text-sm"
      >
        Domain: Web Development (Advanced Web Technology)
      </motion.p>
    </div>
  </section>
);

export default ConclusionSection;
