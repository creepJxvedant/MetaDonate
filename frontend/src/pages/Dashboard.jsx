import { Link, useNavigate } from 'react-router-dom';
import UserDonationList from '../components/Donation/UserDonationList';
import { HandleLogout } from '../secure/IsLoggedIn';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <div className="container mx-auto px-6 py-12">
        {/* Dashboard Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">
            Welcome to Your Dashboard
          </h1>
          <p className="mt-2 text-lg">
            Manage your donations, view history, and more.
          </p>
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Total Donations</h3>
            <p className="mt-2 text-2xl font-bold text-blue-600 dark:text-blue-400">$1234.56</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Past Donations</h3>
            <p className="mt-2 text-lg">You have made 5 donations in total.</p>
            <Link to="/dashboard/past-donations" className="text-blue-600 hover:text-blue-500 mt-2 block">View Past Donations</Link>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Account Settings</h3>
            <p className="mt-2 text-lg">Manage your account settings and preferences.</p>
            <Link to="/dashboard/settings" className="text-blue-600 hover:text-blue-500 mt-2 block">Go to Settings</Link>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={HandleLogout}
            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-500 transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
      <UserDonationList></UserDonationList> 
    </div>
  );
};

export default Dashboard;
