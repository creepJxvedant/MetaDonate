const DonationUserList = () => {
  const transactions = [
    {
      id: 1,
      title: "Donation for Charity A",
      amount: "0.5 ETH",
      fromAddress: "0x6b49b89c49a4b7d1f2c8f4cb91d9bcd99ecfd35c",
      toAddress: "0xAb83e2A60162aD3aF537c1C2b0f5D3e0C4D1A967",
    },
    {
      id: 2,
      title: "Donation for Animal Welfare",
      amount: "1.2 ETH",
      fromAddress: "0x3d89Bda4A42f883283E5A9d0de1e9c6E6c0Fdbd2",
      toAddress: "0x826D47e416B440a931A88E5064F9cBBFF4A92F36",
    },
    {
      id: 3,
      title: "Donation for Health Fund",
      amount: "2.0 ETH",
      fromAddress: "0x45b9f85e45aAbF2265dE2829Ae20e58B94537dF9",
      toAddress: "0x3C5bc1D463eBC6ec7EAF17Bf7f3cb87A7621c2b9",
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">Donation User List</h2>
      <div className="space-y-4">
        {transactions.map(transaction => (
          <div
            key={transaction.id}
            className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
          >
            <h3 className="text-lg font-bold">{transaction.title}</h3>
            <p className="text-sm text-gray-500">Amount: {transaction.amount}</p>
            <div className="mt-2">
              <p className="text-sm text-gray-700">
                <strong>From: </strong>
                {transaction.fromAddress}
              </p>
              <p className="text-sm text-gray-700">
                <strong>To: </strong>
                {transaction.toAddress}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonationUserList;
