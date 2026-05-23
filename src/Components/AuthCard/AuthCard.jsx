import { useState } from 'react';
import './AuthCard.css';
import Logo from './Logo/Logo';
import TabSwitch from './TabSwitch/TabSwitch';
import InputField from './InputField/InputField';
import SubmitButton from './SubmitButton/SubmitButton';
import RoleSelector from './RoleSelector/RoleSelector';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { loginApi, signupApi } from '../../services/api';

function AuthCard() {
  const [activeTab, setActiveTab] = useState('signup');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'user',
    pharmacyName: '',
  });

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setError('');
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRoleChange = (role) => {
    setFormData((prev) => ({ ...prev, role }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (activeTab === 'signin') {
        const res = await loginApi({ email: formData.email, password: formData.password });
        if (res.token) {
          login(res.token, res.user);
          navigate('/homepage');
        } else {
          setError(res.message || 'Login failed');
        }
      } else {
        const payload = {
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        };
        if (formData.role === 'pharmacy') {
          payload.pharmacyName = formData.pharmacyName;
        }
        const res = await signupApi(payload);
        if (res.token) {
          login(res.token, res.user);
          navigate('/homepage');
        } else {
          setError(res.message || 'Signup failed');
        }
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setError('');
    setFormData({ fullName: '', email: '', password: '', role: 'user', pharmacyName: '' });
  };

  return (
    <div className="auth-card">
      <div className="auth-card__header">
        <div className="auth-card__logo-wrap">
          <Logo />
        </div>
        <h1 className="auth-card__title">Welcome to Pharma Guide</h1>
        <p className="auth-card__subtitle">
          {activeTab === 'signup'
            ? 'Create an account to get started.'
            : 'Sign in to your account.'}
        </p>
      </div>

      <div className="auth-card__body">
        <TabSwitch activeTab={activeTab} onTabChange={handleTabChange} />

        <form className="auth-card__form" onSubmit={handleSubmit} noValidate>
          {/* Role selector — signup only */}
          {activeTab === 'signup' && (
            <RoleSelector selectedRole={formData.role} onRoleChange={handleRoleChange} />
          )}

          {activeTab === 'signup' && (
            <InputField
              label="Full name"
              type="text"
              name="fullName"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={handleChange}
            />
          )}

          {/* Pharmacy name field — shown only when role is pharmacy */}
          {activeTab === 'signup' && formData.role === 'pharmacy' && (
            <InputField
              label="Pharmacy Name"
              type="text"
              name="pharmacyName"
              placeholder="Al-Shifa Pharmacy"
              value={formData.pharmacyName}
              onChange={handleChange}
            />
          )}

          <InputField
            label="Email"
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
          />

          <InputField
            label="Password"
            type="password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
          />

          {activeTab === 'signin' && (
            <div className="auth-card__forgot">
              <button type="button" className="auth-card__forgot-btn">
                Forgot password?
              </button>
            </div>
          )}

          {/* Error message */}
          {error && <p className="auth-card__error">{error}</p>}

          <SubmitButton
            label={activeTab === 'signup' ? 'Create account' : 'Sign in'}
            loading={loading}
            onClick={handleSubmit}
          />
        </form>

        <p className="auth-card__footer-text">
          {activeTab === 'signup' ? (
            <>
              Already have an account?{' '}
              <button type="button" className="auth-card__link" onClick={() => handleTabChange('signin')}>
                Sign in
              </button>
            </>
          ) : (
            <>
              Don't have an account?{' '}
              <button type="button" className="auth-card__link" onClick={() => handleTabChange('signup')}>
                Sign up
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default AuthCard;
