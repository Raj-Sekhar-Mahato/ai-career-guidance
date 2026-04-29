import { motion } from "framer-motion";
import { Zap, Target, TrendingUp } from "lucide-react";
import SectionHeading from "./SectionHeading";

const features = [
  { icon: Zap, title: "Priority Weights", desc: "Each skill is assigned a weighted priority based on its importance for different career paths." },
  { icon: Target, title: "Career Score Calculation", desc: "The system calculates a composite score by matching student skills and interests against career requirements." },
  { icon: TrendingUp, title: "Top Recommendations", desc: "The career with the highest weighted score is recommended as the best match for the student." },
];

const RecommendationSection = () => (
  <section className="py-24 relative overflow-hidden">
    <motion.div className="absolute w-[500px] h-[500px] rounded-full bg-accent/5 blur-[150px] -right-40 top-0" />
    <div className="container mx-auto px-6 relative z-10">
      <SectionHeading title="Recommendation Logic" subtitle="A rule-based weighted scoring system that intelligently matches skills to career paths." />
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {features.map((f, i) => {
          const Icon = f.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5 glow-box">
                <Icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default RecommendationSection;
