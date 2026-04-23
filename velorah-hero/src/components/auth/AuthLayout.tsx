import React from 'react';
import { motion } from 'framer-motion';
import '../../styles/auth.css';

interface AuthLayoutProps {
  children: React.ReactNode;
  tagline: string;
  description: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, tagline, description }) => {
  return (
    <div className="auth-container">
      <div className="auth-visual">
        <div className="auth-glow" style={{ top: '10%', left: '10%' }}></div>
        <div className="auth-glow" style={{ bottom: '10%', right: '10%', background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)' }}></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="auth-visual-content"
        >
          <div className="mb-8">
            <span className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/50 text-xs font-semibold uppercase tracking-widest">
              HaNova Platform
            </span>
          </div>
          <h1 className="auth-tagline">{tagline}</h1>
          <p className="auth-description">{description}</p>
          
          <div className="mt-12 flex gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-[#020205] bg-white/10 overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" className="w-full h-full object-cover grayscale opacity-70" />
                </div>
              ))}
            </div>
            <div>
              <p className="text-white text-sm font-semibold">Join 2,000+ mentors</p>
              <p className="text-white/30 text-xs">Transforming education today</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="auth-form-section">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="auth-form-container"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout;
