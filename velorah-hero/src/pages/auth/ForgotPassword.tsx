import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../../components/auth/AuthLayout';
import { ArrowLeft, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <AuthLayout 
      tagline="Recover your access to excellence."
      description="Enter your email and we'll send you instructions to reset your password safely."
    >
      <div className="mb-8">
        <Link to="/signin" className="flex items-center gap-2 text-sm text-gray-500 hover:text-black mb-4 transition-colors">
          <ArrowLeft size={16} />
          Back to sign in
        </Link>
        <h2 className="auth-title">Forgot password?</h2>
        <p className="auth-subtitle">No worries, we'll send you reset instructions.</p>
      </div>

      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <div className="auth-form-group">
            <label className="auth-label" htmlFor="email">Email address</label>
            <input 
              type="email" 
              id="email" 
              className="auth-input" 
              placeholder="name@company.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            className="auth-button-primary"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Reset password'}
          </button>
        </form>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8 rounded-2xl bg-gray-50 border border-gray-100"
        >
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
            <Mail className="text-black" size={24} />
          </div>
          <h3 className="text-lg font-bold mb-2">Check your email</h3>
          <p className="text-gray-500 text-sm mb-6">
            We've sent a password reset link to <br/><strong>{email}</strong>
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="text-sm font-semibold text-black hover:opacity-70 transition-opacity"
          >
            Didn't receive the email? Click to retry
          </button>
        </motion.div>
      )}
    </AuthLayout>
  );
};

export default ForgotPassword;
