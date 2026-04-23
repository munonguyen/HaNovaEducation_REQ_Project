import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/auth/AuthLayout';
import { motion } from 'framer-motion';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <AuthLayout 
      tagline="Unlock your potential with elite mentorship."
      description="Access your personalized learning sanctuary and connect with world-class academic mentors."
    >
      <div className="mb-8">
        <h2 className="auth-title">Welcome back</h2>
        <p className="auth-subtitle">Step back into your journey of excellence.</p>
      </div>

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

        <div className="auth-form-group">
          <label className="auth-label" htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            className="auth-input" 
            placeholder="••••••••" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="auth-options">
          <label className="auth-checkbox-group">
            <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
            <span>Remember me</span>
          </label>
          <Link to="/forgot-password" title="Forgot password?" className="auth-link">Forgot password?</Link>
        </div>

        <button 
          type="submit" 
          className="auth-button-primary"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              Signing in...
            </span>
          ) : 'Sign In'}
        </button>

        <p className="auth-secondary-text">
          Don’t have an account? <Link to="/signup" className="auth-link">Sign up</Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default SignIn;
