import{ useState } from 'react';
export default function DonationForm({ addDonation }) {
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [ethAddress, setEthAddress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !reason || !ethAddress) return;
    addDonation({ amount, reason, ethAddress });
    setAmount('');
    setReason('');
    setEthAddress('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="mb-4">
        <label htmlFor="amount" className="block text-gray-700 text-sm font-bold mb-2">
          Amount Needed (ETH)
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="0.5"
          step="0.01"
          min="0"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="reason" className="block text-gray-700 text-sm font-bold mb-2">
          Reason for Donation
        </label>
        <textarea
          id="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter the reason for your donation request"
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="ethAddress" className="block text-gray-700 text-sm font-bold mb-2">
          Ethereum Address
        </label>
        <input
          type="text"
          id="ethAddress"
          value={ethAddress}
          onChange={(e) => setEthAddress(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="0x..."
          required
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create Donation Request
        </button>
      </div>
    </form>
  );
}

