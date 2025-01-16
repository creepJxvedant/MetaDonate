import WalletConnection from '../components/WalletConnection';
import DonationRequests from '../components/Donation/DonationRequests';

const Donate = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Make a Donation</h1>
      <WalletConnection />
      <DonationRequests></DonationRequests>
      <p className="mt-8 text-lg">Donation form coming soon...</p>
    </div>
  );
};

export default Donate;

