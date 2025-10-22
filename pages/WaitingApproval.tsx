import { useAuth } from '../context/AuthContext';

export default function WaitingApproval() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center">
          {/* Clock/Waiting Icon */}
          <div className="mx-auto w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-6">
            <svg
              className="w-10 h-10 text-orange-600 animate-pulse"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-800 mb-3">
            Account Pending Approval
          </h1>

          {/* Message */}
          <p className="text-gray-600 mb-6 leading-relaxed">
            Welcome, <span className="font-semibold text-blue-600">{user?.fullName}</span>! 
            Your account has been successfully created and is currently waiting for admin approval.
          </p>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">What's next?</span>
              <br />
              Our administrators will review your registration details. You'll be able to access the platform once your account is approved.
            </p>
          </div>

          {/* Account Details */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Your Account Details:</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p><span className="font-medium">Email:</span> {user?.email}</p>
              <p><span className="font-medium">Mobile:</span> {user?.mobile}</p>
              <p><span className="font-medium">MHT ID:</span> {user?.mhtId}</p>
              <p><span className="font-medium">Country:</span> {user?.country}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Check Approval Status
            </button>
            <button
              onClick={handleLogout}
              className="w-full bg-gray-200 text-gray-700 py-2.5 px-4 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Logout
            </button>
          </div>

          {/* Support Text */}
          <p className="text-xs text-gray-500 mt-6">
            Need help? Contact support at{' '}
            <a href="mailto:support@learngujarati.com" className="text-blue-600 hover:underline">
              support@learngujarati.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
