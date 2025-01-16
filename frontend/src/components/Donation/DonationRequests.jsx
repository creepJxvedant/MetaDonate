import React, { useState, useEffect } from 'react';
import { Requests } from '../db/Request';
import DonationModal from './DonationModal';

const DonationRequests = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);

  useEffect(() => {
    try {
      setDonations(Requests);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching donation requests:', error);
      setError('Failed to load donation requests. Please try again later.');
      setLoading(false);
    }
  }, []);

  const handleDonate = (id) => {
    const donation = donations.find(d => d.id === id);
    if (donation) {
      setSelectedDonation(donation);
      setModalOpen(true);
    }
  };

  const fulfillDonation = (amount) => {
    if (selectedDonation) {
      try {
        const updatedDonations = donations.map(donation =>
          donation.id === selectedDonation.id ? { ...donation, fulfilled: true } : donation
        );
        setDonations(updatedDonations);
      } catch (error) {
        console.error('Error fulfilling donation request:', error);
        setError('Failed to fulfill the donation request. Please try again later.');
      }
    }
  };

  const filteredDonations = donations.filter(donation => {
    if (filter === 'open') return !donation.fulfilled;
    if (filter === 'fulfilled') return donation.fulfilled;
    return true;
  });

  const sortedDonations = [...filteredDonations].sort((a, b) => {
    if (sortBy === 'amount') {
      return parseFloat(b.amount) - parseFloat(a.amount);
    }
    return b.id - a.id; // Assuming id represents the date order
  });

  if (loading) {
    return <div className="text-center text-gray-800">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Donation Requests</h2>
      <div className="mb-6 flex flex-wrap justify-between items-center">
        <div className="space-x-2 mb-2 sm:mb-0">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('open')}
            className={`px-4 py-2 rounded-full ${filter === 'open' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            Open
          </button>
          <button
            onClick={() => setFilter('fulfilled')}
            className={`px-4 py-2 rounded-full ${filter === 'fulfilled' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            Fulfilled
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <label htmlFor="sort" className="text-gray-700">Sort by:</label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded-md px-2 py-1"
          >
            <option value="date">Date</option>
            <option value="amount">Amount</option>
          </select>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedDonations.map((donation) => (
          <div key={donation.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{donation.description}</h3>
              <p className="text-gray-600 mb-4">Requested by: {donation.requester}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-gray-800">{donation.amount} ETH</span>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  donation.fulfilled ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
                }`}>
                  {donation.fulfilled ? 'Fulfilled' : 'Open'}
                </span>
              </div>
              {!donation.fulfilled && (
                <button
                  onClick={() => handleDonate(donation.id)}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Donate
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <DonationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onDonate={fulfillDonation}
        maxAmount={selectedDonation?.amount || '0'}
      />
    </div>
  );
};

export default DonationRequests;
