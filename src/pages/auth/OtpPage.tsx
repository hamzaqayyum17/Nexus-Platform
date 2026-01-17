import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';

const OtpPage = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { verifyOtp, tempUser } = useAuth();
  const navigate = useNavigate();

  const handleVerify = async () => {
    try {
      setError(null);
      await verifyOtp(otp);

      if (!tempUser) {
        throw new Error('Session expired - please login again');
      }

      navigate(
        tempUser.role === 'entrepreneur'
          ? '/dashboard/entrepreneur'
          : '/dashboard/investor'
      );
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-xl font-bold mb-4">Enter OTP</h2>

        <input
          className="w-full border px-3 py-2 rounded mb-3"
          placeholder="123456"
          value={otp}
          onChange={e => setOtp(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <Button fullWidth onClick={handleVerify}>
          Verify OTP
        </Button>

        <p className="text-xs text-gray-500 mt-2">
          Demo OTP: <b>123456</b>
        </p>
      </div>
    </div>
  );
};

export default OtpPage;
