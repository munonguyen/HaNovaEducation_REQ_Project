import React from 'react';
import { motion } from 'framer-motion';

const TutorPlaceholder: React.FC<{ title: string }> = ({ title }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="py-32 text-center"
    >
      <div className="glass-panel max-w-lg mx-auto p-12 rounded-3xl">
        <h1 className="text-3xl font-serif text-white mb-4">{title}</h1>
        <p className="text-white/50 tracking-wide">This section is being prepared for your teaching control center.</p>
      </div>
    </motion.div>
  );
};

export const Notifications: React.FC = () => <TutorPlaceholder title="Notifications" />;
export const Profile: React.FC = () => <TutorPlaceholder title="Tutor Profile" />;
export const Settings: React.FC = () => <TutorPlaceholder title="Settings" />;
