import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';

const OtpPage = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleVerify = () => {
    if (otp === '123456') {
      navigate('/dashboard');
    } else {
      alert('Invalid OTP');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-bold mb-4">Enter OTP</h2>

        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full border p-2 mb-4"
          placeholder="123456"
        />

        <Button fullWidth onClick={handleVerify}>
          Verify OTP
        </Button>
      </div>
    </div>
  );
};

export default OtpPage;
