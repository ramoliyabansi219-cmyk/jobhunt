import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, Heart, User, LogIn, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      toast.success('Successfully logged out!');
      navigate('/login');
    } catch (error) {
      toast.error('Failed to log out.');
    }
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <Briefcase className="w-8 h-8 text-purple-600" />
            <span className="text-2xl font-bold text-gray-900">JobHunt</span>
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link to="/jobs" className="text-gray-600 hover:text-purple-600 font-medium">Browse Jobs</Link>
            {currentUser && (
              <Link to="/saved" className="text-gray-600 hover:text-purple-600 font-medium flex items-center gap-1">
                <Heart className="w-4 h-4" /> Saved
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {currentUser ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="font-medium hidden sm:block">
                    {currentUser.displayName || currentUser.email.split('@')[0]}
                  </span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-red-600 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                to="/login"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
