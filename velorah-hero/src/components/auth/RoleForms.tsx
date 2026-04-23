import React from 'react';

interface FormProps {
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

export const StudentForm: React.FC<FormProps> = ({ onSubmit, loading }) => (
  <form onSubmit={onSubmit}>
    <div className="auth-form-group">
      <label className="auth-label">Full Name</label>
      <input type="text" className="auth-input" placeholder="John Doe" required />
    </div>
    <div className="auth-form-group">
      <label className="auth-label">Email address</label>
      <input type="email" className="auth-input" placeholder="john@example.com" required />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="auth-form-group">
        <label className="auth-label">Phone Number</label>
        <input type="tel" className="auth-input" placeholder="+1..." required />
      </div>
      <div className="auth-form-group">
        <label className="auth-label">Learning Goals (Optional)</label>
        <input type="text" className="auth-input" placeholder="e.g. Calculus, IELTS" />
      </div>
    </div>
    <div className="auth-form-group">
      <label className="auth-label">Password</label>
      <input type="password" className="auth-input" placeholder="••••••••" required />
    </div>
    <div className="auth-form-group">
      <label className="auth-label">Confirm Password</label>
      <input type="password" className="auth-input" placeholder="••••••••" required />
    </div>
    <button type="submit" className="auth-button-primary" disabled={loading}>
      {loading ? 'Creating account...' : 'Create Student Account'}
    </button>
  </form>
);

export const TutorForm: React.FC<FormProps> = ({ onSubmit, loading }) => (
  <form onSubmit={onSubmit}>
    <div className="auth-form-group">
      <label className="auth-label">Full Name</label>
      <input type="text" className="auth-input" placeholder="Sarah Miller" required />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="auth-form-group">
        <label className="auth-label">Email</label>
        <input type="email" className="auth-input" placeholder="sarah@tutor.com" required />
      </div>
      <div className="auth-form-group">
        <label className="auth-label">Phone</label>
        <input type="tel" className="auth-input" placeholder="+1..." required />
      </div>
    </div>
    <div className="auth-form-group">
      <label className="auth-label">Qualifications</label>
      <input type="text" className="auth-input" placeholder="e.g. Master in Mathematics" required />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="auth-form-group">
        <label className="auth-label">Years of Experience</label>
        <input type="number" className="auth-input" placeholder="5" required />
      </div>
      <div className="auth-form-group">
        <label className="auth-label">Price per hour ($)</label>
        <input type="number" className="auth-input" placeholder="40" required />
      </div>
    </div>
    <div className="auth-form-group">
      <label className="auth-label">Subjects taught</label>
      <input type="text" className="auth-input" placeholder="e.g. Math, Physics, Chemistry" required />
    </div>
    <div className="auth-form-group">
      <label className="auth-label">Password</label>
      <input type="password" className="auth-input" placeholder="••••••••" required />
    </div>
    <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-100">
      <p className="text-amber-800 text-xs leading-relaxed">
        <strong>Note:</strong> Your profile will be reviewed by our academic board before becoming visible to students.
      </p>
    </div>
    <button type="submit" className="auth-button-primary" disabled={loading}>
      {loading ? 'Submitting...' : 'Apply as Tutor'}
    </button>
  </form>
);

export const AdminForm: React.FC<FormProps> = ({ onSubmit, loading }) => (
  <form onSubmit={onSubmit}>
    <div className="auth-form-group">
      <label className="auth-label">Full Name</label>
      <input type="text" className="auth-input" placeholder="James Wilson" required />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="auth-form-group">
        <label className="auth-label">Work Email</label>
        <input type="email" className="auth-input" placeholder="james@org.com" required />
      </div>
      <div className="auth-form-group">
        <label className="auth-label">Phone</label>
        <input type="tel" className="auth-input" placeholder="+1..." required />
      </div>
    </div>
    <div className="auth-form-group">
      <label className="auth-label">Organization name</label>
      <input type="text" className="auth-input" placeholder="HaNova Academy" required />
    </div>
    <div className="auth-form-group">
      <label className="auth-label">Office address</label>
      <input type="text" className="auth-input" placeholder="123 Education St, NY" required />
    </div>
    <div className="auth-form-group">
      <label className="auth-label">Password</label>
      <input type="password" className="auth-input" placeholder="••••••••" required />
    </div>
    <button type="submit" className="auth-button-primary" disabled={loading}>
      {loading ? 'Processing...' : 'Register Organization'}
    </button>
  </form>
);
