import { motion } from "motion/react";
import { Terminal, BrainCircuit, Activity, ShieldCheck, Gamepad2, Users } from "lucide-react";

const features = [
  {
    title: "AI-Powered Mentoring",
    desc: "24/7 intelligent guidance that adapts to individual learning paces, providing instant code reviews and conceptual breakdowns.",
    icon: BrainCircuit
  },
  {
    title: "Advanced Coding Arena",
    desc: "Integrated Web IDE with multi-language support, automated test suites, and real-time collaborative pair programming.",
    icon: Terminal
  },
  {
    title: "Throughput Analytics",
    desc: "Deep predictive insights into student performance. Track engagement, struggle areas, and velocity in real-time.",
    icon: Activity
  },
  {
    title: "Enterprise Architecture",
    desc: "Secure, redundant, and highly scalable infrastructure built for global universities and massive bootcamps.",
    icon: ShieldCheck
  },
  {
    title: "Contest Gamification",
    desc: "Create and manage global hackathons. Automated leaderboards, badging systems, and rank progression.",
    icon: Gamepad2
  },
  {
    title: "Role-Based Ecosystem",
    desc: "Dedicated interfaces for Admins, Faculty, Trainers, and Students. Context-aware navigation and permissions.",
    icon: Users
  }
];

export const Features = () => {
  return (
    <section id="features" className="py-24 px-6 md:px-10 border-t border-border/50 bg-background">
      <div className="mb-16">
         <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase text-foreground mb-4">Core Architecture</h2>
         <p className="text-muted-foreground/80 font-mono text-xs uppercase tracking-widest max-w-2xl">A modular ecosystem designed to eliminate friction in technical education.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group bg-white/[0.02] border border-border p-8 hover:bg-white/[0.05] transition-colors relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="mb-6 inline-flex p-3 bg-foreground/5 border border-border group-hover:border-primary/50 transition-colors">
               <feature.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-bold uppercase tracking-tight mb-3 text-foreground">{feature.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed font-mono">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
