import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-full bg-blue-600 text-white shadow-xl z-50"
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Brand/Logo */}
        <motion.div
          className="flex items-center space-x-3"
          whileHover={{ scale: 1.05 }}
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <NavLink to="/" className="text-2xl font-bold hover:text-gray-200 transition-colors duration-300">
            Issue Tracker
          </NavLink>
        </motion.div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-8">
          {user ? (
            <>
              <div className="flex space-x-6">
                <NavLink
                  to="/issuelist"
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors duration-300 ${
                      isActive ? 'text-yellow-300 border-b-2 border-yellow-300' : 'text-white hover:text-gray-200'
                    }`
                  }
                >
                  Issues
                </NavLink>
                <NavLink
                  to="/createissue"
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors duration-300 ${
                      isActive ? 'text-yellow-300 border-b-2 border-yellow-300' : 'text-white hover:text-gray-200'
                    }`
                  }
                >
                  Create Issue
                </NavLink>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-200 hidden md:block">Welcome, {user.email}</span>
                <motion.button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Logout
                </motion.button>
              </div>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors duration-300 ${
                    isActive ? 'text-yellow-300 border-b-2 border-yellow-300' : 'text-white hover:text-gray-200'
                  }`
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors duration-300 ${
                    isActive ? 'text-yellow-300 border-b-2 border-yellow-300' : 'text-white hover:text-gray-200'
                  }`
                }
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;