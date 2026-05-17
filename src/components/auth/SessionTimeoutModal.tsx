import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AlertCircle, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const SessionTimeoutModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Simulate session timeout for demo purposes after 30 minutes
  // For demo, let's just make it accessible via a dev trigger or we can just build the UI.
  // I will expose a global method to trigger it for testing.

  useEffect(() => {
    const handleTrigger = () => setIsOpen(true);
    window.addEventListener('trigger-session-timeout', handleTrigger);
    return () => window.removeEventListener('trigger-session-timeout', handleTrigger);
  }, []);

  const handleReLogin = () => {
    setIsOpen(false);
    navigate("/auth/login");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-sm bg-[#080808] border border-white/10 p-6 relative overflow-hidden"
            >
               <div className="absolute top-0 left-0 w-full h-1 bg-red-500" />
               <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
                     <AlertCircle className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black uppercase tracking-tighter italic text-white">Session Expired</h3>
                    <p className="text-xs font-mono text-white/50 mt-2">
                       For your security, your session has been terminated due to inactivity.
                    </p>
                  </div>
                  <div className="w-full pt-4 space-y-2">
                     <button 
                       onClick={handleReLogin}
                       className="w-full h-10 bg-primary text-black text-[10px] font-black uppercase tracking-widest hover:bg-white transition-colors"
                     >
                       Re-Authenticate
                     </button>
                  </div>
               </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
