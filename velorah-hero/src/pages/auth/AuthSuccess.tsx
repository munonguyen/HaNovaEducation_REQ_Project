import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import AuthLayout from '../../components/auth/AuthLayout';
import { CheckCircle2, Clock, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const AuthSuccess: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const role = location.state?.role || 'student';

  const getContent = () => {
    switch (role) {
      case 'tutor':
        return {
          icon: <Clock className="text-amber-500" size={48} />,
          title: "Application Under Review",
          message: "Thank you for applying! Our academic board will review your qualifications. You'll receive an email once your profile is approved.",
          cta: "View profile status",
          link: "/profile"
        };
      case 'admin':
        return {
          icon: <ShieldCheck className="text-indigo-500" size={48} />,
          title: "Organization Registered",
          message: "Your organization has been successfully registered. Please check your official email for the next steps in setting up your workspace.",
          cta: "Go to workspace",
          link: "/dashboard"
        };
      default:
        return {
          icon: <CheckCircle2 className="text-green-500" size={48} />,
          title: "Welcome to HaNova!",
          message: "Your account is ready. You can now start exploring world-class mentors and personalized study plans.",
          cta: "Go to Dashboard",
          link: "/dashboard"
        };
    }
  };

  const content = getContent();

  return (
    <AuthLayout 
      tagline="A new chapter in your education begins."
      description="You've successfully joined the HaNova community. We're excited to be part of your journey."
    >
      <div className="text-center py-8">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="flex justify-center mb-6"
        >
          {content.icon}
        </motion.div>
        
        <h2 className="auth-title mb-4">{content.title}</h2>
        <p className="auth-subtitle mb-10">{content.message}</p>
        
        <button 
          onClick={() => navigate(content.link)}
          className="auth-button-primary"
        >
          {content.cta}
        </button>
        
        <p className="auth-secondary-text">
          Need help? <Link to="/support" className="auth-link">Contact Support</Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default AuthSuccess;
