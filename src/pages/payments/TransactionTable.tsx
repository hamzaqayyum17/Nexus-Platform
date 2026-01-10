const transactions = [
  { id: 1, amount: 1000, sender: 'Investor A', receiver: 'Startup X', status: 'Completed' },
  { id: 2, amount: 500, sender: 'Wallet', receiver: 'Bank', status: 'Pending' },
];

const TransactionTable = () => {
  return (
    <div className="border rounded-lg p-4">
      <h2 className="font-semibold mb-3">Transaction History</h2>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500">
            <th>Amount</th>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(tx => (
            <tr key={tx.id} className="border-t">
              <td>${tx.amount}</td>
              <td>{tx.sender}</td>
              <td>{tx.receiver}</td>
              <td>{tx.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
