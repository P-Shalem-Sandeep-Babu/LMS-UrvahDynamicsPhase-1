import { motion } from "motion/react";

const testimonials = [
  {
    quote: "The AI Mentor reduced our faculty's manual grading overhead by 70%. It doesn't just evaluate syntax, it analyzes algorithmic strategy in real-time.",
    author: "Dr. Elena Rostova",
    role: "Dean of Computer Science",
    company: "Tech University"
  },
  {
    quote: "Integrating the coding arena into our bootcamp allowed us to scale from 200 to 5000 students without sacrificing the quality of code reviews.",
    author: "James Thorne",
    role: "VP of Engineering",
    company: "DataStack Academy"
  },
  {
    quote: "The enterprise dashboard provides instant visibility. If a cohort is struggling with closures, we know within minutes, not weeks.",
    author: "Sarah Lin",
    role: "Lead Instructor",
    company: "DevBridge Learning"
  }
];

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 px-6 md:px-10 bg-card border-t border-border/50">
      <div className="mb-16 md:text-center max-w-3xl mx-auto">
         <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase text-foreground mb-4">Enterprise Validation</h2>
         <p className="text-muted-foreground/80 font-mono text-xs uppercase tracking-widest">Trusted by leading technical institutions globally.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-8 border border-border bg-white/[0.02] flex flex-col justify-between"
          >
             <div className="mb-8">
               <div className="text-primary text-4xl font-serif mb-2 leading-none">"</div>
               <p className="text-sm font-mono text-foreground/70 leading-relaxed">{t.quote}</p>
             </div>
             <div>
               <div className="w-10 h-px bg-primary/50 mb-4" />
               <h4 className="text-xs font-bold uppercase tracking-widest text-foreground">{t.author}</h4>
               <p className="text-[10px] uppercase tracking-widest text-primary mt-1">{t.role}</p>
               <p className="text-[10px] font-mono text-muted-foreground/60">{t.company}</p>
             </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
