import { useState } from 'react';
import WalletCard from './WalletCard';
import TransactionTable from './TransactionTable';
import FundDealModal from './FundDealModal';
import { Button } from '../../components/ui/Button';

const PaymentsPage = () => {
  const [balance, setBalance] = useState(5000);
  const [showFundModal, setShowFundModal] = useState(false);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Payments & Wallet</h1>

      <WalletCard balance={balance} />

      <div className="flex gap-3">
        <Button variant="success">Deposit</Button>
        <Button variant="secondary">Withdraw</Button>
        <Button onClick={() => setShowFundModal(true)}>
          Fund a Deal
        </Button>
      </div>

      <TransactionTable />

      {showFundModal && (
        <FundDealModal
          onClose={() => setShowFundModal(false)}
          onConfirm={(amount: number) => {
            setBalance(balance - amount);
            setShowFundModal(false);
          }}

        />
      )}
    </div>
  );
};

export default PaymentsPage;
