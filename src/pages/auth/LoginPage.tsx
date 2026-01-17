import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, verifyOtp } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'login' | 'otp'>('login');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // STEP 1: LOGIN (OTP WILL BE REQUIRED)
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await login(email, password); // AuthContext handles OTP requirement
      setStep('otp');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  // STEP 2: OTP VERIFY
  const handleOtpVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const role = email.includes('investor') ? 'investor' : 'entrepreneur';
      await verifyOtp(otp);
      
      // Navigate based on email since user state updates asynchronously
      navigate(
        role === 'entrepreneur'
          ? '/dashboard/entrepreneur'
          : '/dashboard/investor'
      );
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
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

        {step === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              fullWidth
              startAdornment={<Mail size={18} />}
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              fullWidth
              startAdornment={<Lock size={18} />}
            />

            <Button type="submit" fullWidth isLoading={isLoading}>
              Continue
            </Button>
          </form>
        )}

        {step === 'otp' && (
          <form onSubmit={handleOtpVerify} className="space-y-4">
            <Input
              label="Enter OTP"
              value={otp}
              onChange={e => setOtp(e.target.value)}
              required
              fullWidth
            />

            <Button type="submit" fullWidth isLoading={isLoading}>
              Verify & Login
            </Button>
          </form>
        )}

        <p className="text-sm text-center mt-4">
          Don’t have an account?{' '}
          <Link to="/register" className="text-indigo-600 font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
