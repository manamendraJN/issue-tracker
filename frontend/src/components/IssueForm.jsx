import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { IssueContext } from '../context/IssueContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeading, FaAlignLeft, FaExclamationCircle, FaFlag, FaTasks } from 'react-icons/fa';

function IssueForm({ closeModal }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    severity: 'Low',
    priority: 'Low',
    status: 'Open'
  });
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const { addIssue } = useContext(IssueContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addIssue(formData);
      toast.success('Issue created successfully!');
      closeModal();
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Session expired. Please sign in again.');
      } else {
        setError(err.response?.data?.error || 'Failed to create issue');
      }
    }
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold text-white mb-6 tracking-tight">Create New Issue</h2>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-red-300 bg-red-500/20 p-3 rounded-lg mb-4 text-sm flex items-center"
          >
            {error}
            {error.includes('Session expired') && (
              <button
                onClick={() => navigate('/login')}
                className="ml-4 bg-blue-600 text-white px-2 py-1 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300"
              >
                Sign In Again
              </button>
            )}
          </motion.p>
        )}
      </AnimatePresence>
      <div className="space-y-4">
        <div className="relative">
          <label htmlFor="title" className="block text-sm font-medium text-gray-200 mb-1">
            Title
          </label>
          <div className="relative">
            <FaHeading className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <motion.input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              placeholder="Enter issue title"
              whileFocus={{ scale: 1.01 }}
              aria-label="Issue title"
            />
          </div>
        </div>
        <div className="relative">
          <label htmlFor="description" className="block text-sm font-medium text-gray-200 mb-1">
            Description
          </label>
          <div className="relative">
            <FaAlignLeft className="absolute left-3 top-3 text-gray-400" />
            <motion.textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-y"
              rows="4"
              placeholder="Describe the issue"
              whileFocus={{ scale: 1.01 }}
              aria-label="Issue description"
            />
          </div>
        </div>
        <div className="relative">
          <label htmlFor="severity" className="block text-sm font-medium text-gray-200 mb-1">
            Severity
          </label>
          <div className="relative">
            <FaExclamationCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <motion.select
              id="severity"
              name="severity"
              value={formData.severity}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 appearance-none"
              whileFocus={{ scale: 1.01 }}
              aria-label="Issue severity"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </motion.select>
          </div>
        </div>
        <div className="relative">
          <label htmlFor="priority" className="block text-sm font-medium text-gray-200 mb-1">
            Priority
          </label>
          <div className="relative">
            <FaFlag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <motion.select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 appearance-none"
              whileFocus={{ scale: 1.01 }}
              aria-label="Issue priority"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </motion.select>
          </div>
        </div>
        <div className="relative">
          <label htmlFor="status" className="block text-sm font-medium text-gray-200 mb-1">
            Status
          </label>
          <div className="relative">
            <FaTasks className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <motion.select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 appearance-none"
              whileFocus={{ scale: 1.01 }}
              aria-label="Issue status"
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Testing">Testing</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </motion.select>
          </div>
        </div>
        <div className="flex gap-4">
          <motion.button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 text-base font-medium"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            aria-label="Create issue"
          >
            Create Issue
          </motion.button>
          <motion.button
            type="button"
            onClick={closeModal}
            className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 text-base font-medium"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            aria-label="Cancel"
          >
            Cancel
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default IssueForm;