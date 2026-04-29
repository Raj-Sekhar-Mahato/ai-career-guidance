import { motion } from "framer-motion";
import { Brain, Sparkles, ArrowDown, LogIn } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
      <div className="absolute inset-0 bg-grid opacity-20" />
      <motion.div
        className="absolute w-72 h-72 rounded-full bg-primary/10 blur-[100px] animate-pulse-glow"
        style={{ top: "15%", left: "10%" }}
      />
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-accent/10 blur-[120px] animate-pulse-glow"
        style={{ bottom: "10%", right: "5%", animationDelay: "1.5s" }}
      />

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-8"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm text-primary font-medium">Advanced Web Technology Project</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
        >
          <span className="text-foreground">AI-Enabled</span>
          <br />
          <span className="text-gradient">Career Guidance</span>
          <br />
          <span className="text-foreground">&amp; Skill Mapping</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10"
        >
          A data-driven web portal helping students discover their ideal career paths through intelligent skill assessment and weighted scoring.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
        >
          <a href="#overview" className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:brightness-110 transition-all glow-box">
            <Brain className="w-5 h-5" />
            Explore System
          </a>
          <Link to="/login" className="inline-flex items-center gap-2 px-8 py-3 rounded-lg border border-primary/40 text-primary hover:bg-primary/10 transition-all font-semibold">
            <LogIn className="w-5 h-5" />
            Login / Register
          </Link>
          <a href="#team" className="inline-flex items-center gap-2 px-8 py-3 rounded-lg border border-border text-foreground hover:bg-secondary transition-all">
            Meet the Team
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="animate-float"
        >
          <ArrowDown className="w-6 h-6 text-muted-foreground mx-auto" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
