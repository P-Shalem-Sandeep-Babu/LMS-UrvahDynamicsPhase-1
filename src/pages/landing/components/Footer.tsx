import { BrainCircuit } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-[#000] pt-16 pb-8 px-6 md:px-10">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 font-bold bg-primary rounded-sm flex items-center justify-center text-black text-xl">
                U
              </div>
              <span className="text-lg font-bold tracking-tighter uppercase italic text-foreground">
                Urvah Dynamics
              </span>
            </div>
            <p className="text-xs font-mono text-muted-foreground/80 max-w-sm leading-relaxed mb-6">
              Engineering the future of technical education. Deployment architecture available for global scale.
            </p>
            <Link to="/dashboard" className="inline-flex items-center gap-2 px-6 py-3 bg-foreground/5 border border-border text-[10px] font-black uppercase tracking-widest text-primary hover:bg-foreground/10 transition-colors">
              <BrainCircuit className="w-3 h-3" /> Execute Demo
            </Link>
          </div>

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-foreground/70 mb-4">Platform</h4>
            <ul className="space-y-3 text-[10px] font-mono text-muted-foreground/80">
              <li><a href="#" className="hover:text-primary transition-colors">Compiler Module</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">AI Mentor</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Analytics Engine</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Enterprise RBAC</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-foreground/70 mb-4">Resources</h4>
            <ul className="space-y-3 text-[10px] font-mono text-muted-foreground/80">
              <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">System Status</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Security</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[8px] font-mono uppercase tracking-widest text-white/20">
          <p>&copy; {new Date().getFullYear()} Urvah Dynamics Pvt Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
