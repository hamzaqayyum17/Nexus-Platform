import { useState } from 'react';
import { Button } from '../../components/ui/Button';

interface FundDealModalProps {
  onClose: () => void;
  onConfirm: (amount: number) => void;
}

const FundDealModal: React.FC<FundDealModalProps> = ({ onClose, onConfirm }) => {
  const [amount, setAmount] = useState(0);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded w-full max-w-md space-y-4">
        <h2 className="font-semibold text-lg">Fund Deal</h2>

        <input
          type="number"
          placeholder="Enter amount"
          className="w-full border px-3 py-2 rounded"
          onChange={(e) => setAmount(Number(e.target.value))}
          min="0"
          step="100"
        />

        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            variant="success" 
            onClick={() => {
              if (amount > 0) {
                onConfirm(amount);
              }
            }}
          >
            Confirm Funding
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FundDealModal;
