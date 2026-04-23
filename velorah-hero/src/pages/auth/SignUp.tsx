import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/auth/AuthLayout';
import RoleSelection from '../../components/auth/RoleSelection';
import { StudentForm, TutorForm, AdminForm } from '../../components/auth/RoleForms';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const SignUp: React.FC = () => {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState('student');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRoleSelect = (selectedRole: string) => {
    setRole(selectedRole);
    setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigate('/auth-success', { state: { role } });
    }, 1500);
  };

  return (
    <AuthLayout 
      tagline="Join the future of academic excellence."
      description="Create your account and join a global community of elite scholars and mentors."
    >
      <div className="mb-8">
        {step === 2 && (
          <button 
            onClick={() => setStep(1)}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-black mb-4 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to roles
          </button>
        )}
        <h2 className="auth-title">
          {step === 1 ? 'Who are you?' : 'Finalize your profile'}
        </h2>
        <p className="auth-subtitle">
          {step === 1 
            ? 'Select your role to personalize your experience.' 
            : `Fill in your details to get started as a ${role}.`}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <RoleSelection onSelect={handleRoleSelect} selectedRole={role} />
            <p className="auth-secondary-text mt-8">
              Already have an account? <Link to="/signin" className="auth-link">Sign in</Link>
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {role === 'student' && <StudentForm onSubmit={handleSubmit} loading={loading} />}
            {role === 'tutor' && <TutorForm onSubmit={handleSubmit} loading={loading} />}
            {role === 'admin' && <AdminForm onSubmit={handleSubmit} loading={loading} />}
          </motion.div>
        )}
      </AnimatePresence>
    </AuthLayout>
  );
};

export default SignUp;
