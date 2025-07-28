import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

function Register() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData.email, formData.password);
      toast.success('Registration successful!');
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="flex w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Left Issue Tracker Box */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-1/3 bg-blue-600 text-white p-8 flex flex-col justify-between"
        >
          <div>
            <h3 className="text-2xl font-bold mb-4">Issue Tracker</h3>
            <p className="text-sm opacity-90">
              Join our platform to manage projects, track issues, and collaborate seamlessly with your team.
            </p>
          </div>
          <div className="mt-6">
            <p className="text-xs opacity-75">Trusted by teams worldwide</p>
            <div className="flex gap-2 mt-2">
              <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="inline-block w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-200"></span>
              <span className="inline-block w-2 h-2 bg-red-400 rounded-full animate-pulse delay-400"></span>
            </div>
          </div>
        </motion.div>

        {/* Register Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-2/3 p-8"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Create Your Account</h2>
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 mb-4 bg-red-50 p-3 rounded-lg"
            >
              {error}
            </motion.p>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <motion.input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                whileFocus={{ scale: 1.02 }}
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <motion.input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                whileFocus={{ scale: 1.02 }}
                placeholder="Create a password"
              />
            </div>
            <motion.button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Register
            </motion.button>
          </form>
          <p className="mt-6 text-center text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-blue-600 hover:underline font-medium">
              Login
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default Register;