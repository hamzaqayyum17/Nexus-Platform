import { useState } from 'react';
import { Button } from '../../components/ui/Button';

const FundDealModal = ({ onClose, onConfirm }: any) => {
  const [amount, setAmount] = useState(0);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-[400px] space-y-4">
        <h2 className="font-semibold">Fund Deal</h2>

        <input
          type="number"
          placeholder="Enter amount"
          className="w-full border px-3 py-2 rounded"
          onChange={(e) => setAmount(Number(e.target.value))}
        />

        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="success" onClick={() => onConfirm(amount)}>
            Confirm Funding
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FundDealModal;
