import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

const MOCK_OTP = '123456';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'login' | 'otp'>('login');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { login, user } = useAuth();
  const navigate = useNavigate();

  // STEP 1: LOGIN
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await login(email, password);
      setStep('otp'); // go to OTP step
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  // STEP 2: OTP VERIFY
  const handleOtpVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (otp !== MOCK_OTP) {
      setError('Invalid OTP. Try 123456');
      return;
    }

    // Role-based redirect
    navigate(
      user?.role === 'entrepreneur'
        ? '/dashboard/entrepreneur'
        : '/dashboard/investor'
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6">
          {step === 'login' ? 'Sign in to your account' : 'Verify OTP'}
        </h2>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-500 text-red-700 px-4 py-3 rounded flex items-center">
            <AlertCircle size={18} className="mr-2" />
            {error}
          </div>
        )}

        {/* LOGIN FORM */}
        {step === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              startAdornment={<Mail size={18} />}
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              startAdornment={<Lock size={18} />}
            />

            <Button type="submit" fullWidth isLoading={isLoading}>
              Continue
            </Button>

            <p className="text-sm text-center text-gray-600">
              Don’t have an account?{' '}
              <Link to="/register" className="text-primary-600 font-medium">
                Register
              </Link>
            </p>
          </form>
        )}

        {/* OTP FORM */}
        {step === 'otp' && (
          <form onSubmit={handleOtpVerify} className="space-y-4">
            <Input
              label="Enter OTP"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              fullWidth
            />

            <p className="text-xs text-gray-500 text-center">
              Demo OTP: <span className="font-mono">123456</span>
            </p>

            <Button type="submit" fullWidth>
              Verify & Login
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;