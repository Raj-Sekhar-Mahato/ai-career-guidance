import { motion } from "framer-motion";
import { UserPlus, ClipboardList, Cpu, BarChart3, ShieldCheck } from "lucide-react";
import SectionHeading from "./SectionHeading";

const steps = [
  { icon: UserPlus, title: "Student Registration & Login", desc: "Secure sign-up with role-based access control" },
  { icon: ClipboardList, title: "Enter Marks, Skills & Interests", desc: "Students input academic and personal data" },
  { icon: Cpu, title: "System Processes Input Data", desc: "Weighted scoring engine analyzes the profile" },
  { icon: BarChart3, title: "Career Recommendations", desc: "Top matching career paths with scores" },
  { icon: ShieldCheck, title: "Admin Reports & Dashboard", desc: "Comprehensive analytics for administrators" },
];

const OverviewSection = () => (
  <section id="overview" className="py-24 relative">
    <div className="container mx-auto px-6">
      <SectionHeading title="System Overview" subtitle="A step-by-step workflow guiding students from registration to personalized career recommendations." />

      <div className="relative max-w-4xl mx-auto">
        {/* Vertical line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-accent/40 to-transparent hidden md:block" />

        {steps.map((step, i) => {
          const Icon = step.icon;
          const isLeft = i % 2 === 0;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative flex items-center mb-12 md:mb-16 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
            >
              <div className={`flex-1 ${isLeft ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                <div className={`card-gradient border border-border rounded-xl p-6 hover:border-primary/40 transition-colors glow-box ${isLeft ? "" : ""}`}>
                  <div className={`flex items-center gap-3 mb-2 ${isLeft ? "md:justify-end" : ""}`}>
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">{step.desc}</p>
                </div>
              </div>
              {/* Center dot */}
              <div className="hidden md:flex w-4 h-4 rounded-full bg-primary border-4 border-background absolute left-1/2 -translate-x-1/2 z-10" />
              <div className="flex-1 hidden md:block" />
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default OverviewSection;
