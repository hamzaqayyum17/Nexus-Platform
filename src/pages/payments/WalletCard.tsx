import { Card } from '../../components/ui/Card';

const WalletCard = ({ balance }: { balance: number }) => {
  return (
    <Card className="p-6">
      <p className="text-gray-500">Wallet Balance</p>
      <h2 className="text-3xl font-bold">${balance}</h2>
    </Card>
  );
};

export default WalletCard;
