import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  Mail,
  Lock,
  CircleDollarSign,
  Building2,
  AlertCircle,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { UserRole } from '../../types';
/* ✅ PASSWORD STRENGTH HELPER (TOP PE) */
const getPasswordStrength = (password: string) => {
  let score = 0;

  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2)
    return { label: 'Weak', color: 'bg-red-500', width: '33%' };
  if (score === 3)
    return { label: 'Medium', color: 'bg-yellow-500', width: '66%' };
  return { label: 'Strong', color: 'bg-green-500', width: '100%' };
};

export const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>('entrepreneur');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const strength = getPasswordStrength(password);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      await register(name, email, password, role);
      navigate(
        role === 'entrepreneur'
          ? '/dashboard/entrepreneur'
          : '/dashboard/investor'
      );
    } catch (err) {
      setError((err as Error).message);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Join Business Nexus to connect with partners
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-500 text-red-700 px-4 py-3 rounded-md flex items-start">
              <AlertCircle size={18} className="mr-2 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* ROLE */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className={`py-3 border rounded-md flex justify-center ${
                  role === 'entrepreneur'
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-300'
                }`}
                onClick={() => setRole('entrepreneur')}
              >
                <Building2 className="mr-2" /> Entrepreneur
              </button>

              <button
                type="button"
                className={`py-3 border rounded-md flex justify-center ${
                  role === 'investor'
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-300'
                }`}
                onClick={() => setRole('investor')}
              >
                <CircleDollarSign className="mr-2" /> Investor
              </button>
            </div>

            <Input label="Full name" value={name} onChange={e => setName(e.target.value)} required fullWidth startAdornment={<User size={18} />} />
            <Input label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required fullWidth startAdornment={<Mail size={18} />} />
            <Input label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required fullWidth startAdornment={<Lock size={18} />} />

            {/* PASSWORD STRENGTH */}
            {password && (
              <div>
                <div className="h-2 bg-gray-200 rounded">
                  <div
                    className={`h-2 rounded ${strength.color}`}
                    style={{ width: strength.width }}
                  />
                </div>
                <p className="text-xs mt-1">
                  Strength: <b>{strength.label}</b>
                </p>
              </div>
            )}

            <Input label="Confirm password" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required fullWidth startAdornment={<Lock size={18} />} />

            <Button type="submit" fullWidth isLoading={isLoading}>
              Create account
            </Button>
          </form>

          <p className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
