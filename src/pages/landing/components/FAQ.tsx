import { motion } from "motion/react";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "How does the AI Mentor prevent students from cheating?",
    a: "The AI is designed to act as a Socratic guide. It analyzes the code and rubrics, providing hints, pointing out logic gaps, and asking guiding questions. It is hardcoded to never provide complete solutions."
  },
  {
    q: "Can we integrate this with our existing HR or Auth systems?",
    a: "Yes. The platform supports native SAML, OAuth2, and Custom JWT authentication for seamless integration into enterprise directories like Active Directory or Okta."
  },
  {
    q: "What programming languages are supported in the Arena?",
    a: "The compiler module supports 15+ languages including Python, React (TypeScript), Java, C++, Go, and Rust, with containerized execution environments for maximum security."
  },
  {
    q: "Is the throughput analytics dashboard customizable?",
    a: "Absolutely. Administrators can write custom visualization queries, tracking specific learning outcomes, dropout risks, and engagement metrics via the internal analytics API."
  }
];

export const FAQ = () => {
  return (
    <section className="py-24 px-6 md:px-10 bg-[#050505] border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase text-white mb-12">Technical Inquiries</h2>
        
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="border border-white/10 group bg-white/[0.02]"
            >
              <details className="p-6 cursor-pointer marker:content-['']">
                <summary className="flex items-center justify-between text-sm md:text-base font-bold uppercase tracking-widest text-white/80 group-hover:text-white transition-colors">
                  {faq.q}
                  <Plus className="w-5 h-5 text-primary" />
                </summary>
                <div className="pt-4 mt-4 border-t border-white/10 text-sm font-mono text-white/50 leading-relaxed">
                  {faq.a}
                </div>
              </details>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
