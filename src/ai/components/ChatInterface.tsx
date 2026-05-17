import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, BrainCircuit, User, Sparkles, AlertTriangle } from "lucide-react";

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  isTyping?: boolean;
}

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'ai', text: 'Neural link established. I am your assigned System Oracle. I noticed your performance in Dynamic Programming is currently suboptimal (42% accuracy). How can I assist you with your training today?' }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    "Explain memoization in DP",
    "Give me an easy DP practice problem",
    "Review my last contest performance"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    
    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text };
    const typingId = (Date.now() + 1).toString();
    
    setMessages(prev => [...prev, userMsg, { id: typingId, sender: 'ai', text: '', isTyping: true }]);
    setInput('');

    // Mock AI response
    setTimeout(() => {
      setMessages(prev => prev.map(m => m.id === typingId ? { 
        id: typingId, 
        sender: 'ai', 
        text: "I am analyzing your query. Based on your recent execution logs, I suggest starting with the 'Fibonacci Sequence' or 'Climbing Stairs' to build foundational intuition for memoization. Would you like me to deploy a tailored exercise in your workspace?" 
      } : m));
    }, 2000);
  };

  return (
    <div className="flex-1 flex flex-col h-full relative z-10">
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-4 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 shrink-0 rounded-none border flex items-center justify-center ${
                msg.sender === 'ai' ? 'bg-primary/10 border-primary text-primary' : 'bg-white/5 border-white/20 text-white/50'
              }`}>
                {msg.sender === 'ai' ? <BrainCircuit className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>
              <div className={`p-4 border text-sm font-mono leading-relaxed ${
                msg.sender === 'ai' ? 'bg-primary/5 border-primary/20 text-white/80' : 'bg-white/[0.02] border-white/10 text-white/70'
              }`}>
                {msg.isTyping ? (
                  <div className="flex gap-1 items-center h-5 text-primary">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                ) : (
                  msg.text
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-white/10 bg-black/50 backdrop-blur-md">
        <div className="flex flex-wrap gap-2 mb-4">
          {suggestedPrompts.map(prompt => (
            <button
              key={prompt}
              onClick={() => handleSend(prompt)}
              className="px-3 py-1.5 border border-primary/20 bg-primary/5 text-primary text-[10px] uppercase font-bold tracking-widest hover:bg-primary/20 transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3 h-3" /> {prompt}
            </button>
          ))}
        </div>
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
            placeholder="INPUT QUERY DIRECTIVE..."
            className="w-full bg-white/5 border border-white/10 text-white font-mono text-sm px-4 py-4 pr-12 focus:outline-none focus:border-primary/50 transition-colors"
          />
          <button 
            onClick={() => handleSend(input)}
            disabled={!input.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-white/50 hover:text-primary transition-colors disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center gap-2 mt-2 text-[8px] font-mono uppercase tracking-widest text-white/30">
          <AlertTriangle className="w-3 h-3" /> System Oracle may produce inaccurate outputs. Verify critical logic.
        </div>
      </div>
    </div>
  );
};
