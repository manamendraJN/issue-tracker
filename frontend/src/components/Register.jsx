import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaLock } from 'react-icons/fa';

function Register() {
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'password') {
      evaluatePasswordStrength(value);
    }
  };

  const evaluatePasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    const strengthLabels = ['Weak', 'Moderate', 'Strong', 'Very Strong'];
    setPasswordStrength(strengthLabels[score - 1] || 'Very Weak');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      await register(formData.email, formData.password);
      toast.success('Registration successful!');
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  const getStrengthColor = (strength) => {
    switch (strength) {
      case 'Very Weak': return 'bg-red-500';
      case 'Weak': return 'bg-orange-500';
      case 'Moderate': return 'bg-yellow-500';
      case 'Strong': return 'bg-green-500';
      case 'Very Strong': return 'bg-teal-500';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-4xl bg-white/10 backdrop-blur-xl rounded-2xl mt-10 shadow-2xl overflow-hidden flex flex-col md:flex-row"
      >
        {/* Left Branding Panel */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="md:w-1/3 bg-gradient-to-b from-blue-600 to-blue-800 text-white p-8 flex flex-col justify-between"
        >
          <div>
            <h3 className="text-3xl font-bold tracking-tight mb-4">IssueSync</h3>
            <p className="text-sm leading-relaxed opacity-90">
              Join our cutting-edge platform to streamline project management, track issues, and collaborate with your team effortlessly.
            </p>
          </div>
          <div className="mt-6">
            <p className="text-xs opacity-75">Powering teams globally</p>
            <div className="flex gap-3 mt-3">
              <motion.span className="w-2.5 h-2.5 bg-green-400 rounded-full" animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} />
              <motion.span className="w-2.5 h-2.5 bg-yellow-400 rounded-full" animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }} />
              <motion.span className="w-2.5 h-2.5 bg-red-400 rounded-full" animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.6 }} />
            </div>
          </div>
        </motion.div>

        {/* Register Form Panel */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="md:w-2/3 p-8 sm:p-10 lg:p-12"
        >
          <h2 className="text-3xl font-bold text-white mb-8 tracking-tight">Create Your Account</h2>
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-red-300 bg-red-500/20 p-4 rounded-lg mb-6 text-sm"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <div className="space-y-6">
            {/* Email */}
            <div className="relative">
              <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <motion.input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-white focus:outline-none transition-all duration-300"
                  placeholder="Enter your email"
                  whileFocus={{ scale: 1.01 }}
                  aria-label="Email address"
                />
              </div>
            </div>

            {/* Password */}
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-2">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <motion.input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-white focus:outline-none transition-all duration-300"
                  placeholder="Create a password"
                  whileFocus={{ scale: 1.01 }}
                  aria-label="Password"
                />
              </div>
              <div className="mt-2">
                <div className={`h-2 rounded-full ${getStrengthColor(passwordStrength)} transition-all duration-300`} />
                <p className="text-sm text-gray-300 mt-1">Strength: {passwordStrength}</p>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-200 mb-2">
                Re-enter Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <motion.input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-white focus:outline-none transition-all duration-300"
                  placeholder="Re-enter your password"
                  whileFocus={{ scale: 1.01 }}
                  aria-label="Confirm Password"
                />
              </div>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 text-base font-medium"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              aria-label="Register"
            >
              Register
            </motion.button>
          </div>

          <p className="mt-6 text-center text-gray-300 text-sm">
            Already have an account?{' '}
            <a href="/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200">
              Sign in
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Register;
