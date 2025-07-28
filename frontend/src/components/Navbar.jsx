import { memo, useContext, useCallback } from 'react';
import { AuthContext } from '../context/AuthContext';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaBug, FaSignOutAlt, FaSignInAlt, FaUserPlus, FaTasks } from 'react-icons/fa';

const Navbar = memo(() => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    logout();
    navigate('/login');
  }, [logout, navigate]);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/10 backdrop-blur-xl text-white shadow-xl z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Brand/Logo */}
        <div className="flex items-center space-x-3">
          <FaBug className="w-8 h-8 text-blue-400" />
          <NavLink
            to="/issuelist"
            className="text-2xl font-bold text-white hover:text-blue-300 transition-colors duration-300"
          >
            IssueSync
          </NavLink>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6 lg:space-x-8">
          {user ? (
            <>
              <div className="flex space-x-4 lg:space-x-6">
                <NavLink
                  to="/issuelist"
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors duration-300 flex items-center ${
                      isActive ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-300 hover:text-blue-300'
                    }`
                  }
                >
                  <FaTasks className="mr-2" />
                  Issues
                </NavLink>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-300 hidden md:block">Welcome, {user.email}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300"
                  aria-label="Log out"
                >
                  <FaSignOutAlt className="mr-2" />
                  Sign Out
                </button>
              </div>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors duration-300 flex items-center ${
                    isActive ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-300 hover:text-blue-300'
                  }`
                }
              >
                <FaSignInAlt className="mr-2" />
                Sign In
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors duration-300 flex items-center ${
                    isActive ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-300 hover:text-blue-300'
                  }`
                }
              >
                <FaUserPlus className="mr-2" />
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
});

export default Navbar;