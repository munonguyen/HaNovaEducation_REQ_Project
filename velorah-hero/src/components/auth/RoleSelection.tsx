import React, { useState } from 'react';
import { User, GraduationCap, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface RoleSelectionProps {
  onSelect: (role: string) => void;
  selectedRole: string;
}

const RoleSelection: React.FC<RoleSelectionProps> = ({ onSelect, selectedRole }) => {
  const roles = [
    {
      id: 'student',
      name: 'Student',
      description: 'I want to learn and find a mentor.',
      icon: <GraduationCap size={20} />
    },
    {
      id: 'tutor',
      name: 'Tutor',
      description: 'I want to teach and share my expertise.',
      icon: <User size={20} />
    },
    {
      id: 'admin',
      name: 'Manager / Admin',
      description: 'I represent an institution or organization.',
      icon: <Building2 size={20} />
    }
  ];

  return (
    <div className="role-grid">
      {roles.map((role) => (
        <motion.div
          key={role.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`role-card ${selectedRole === role.id ? 'selected' : ''}`}
          onClick={() => onSelect(role.id)}
        >
          <div className="role-icon">
            {role.icon}
          </div>
          <div className="role-name">{role.name}</div>
          <div className="role-desc">{role.description}</div>
        </motion.div>
      ))}
    </div>
  );
};

export default RoleSelection;
