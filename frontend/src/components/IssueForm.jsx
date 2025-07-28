import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { IssueContext } from '../context/IssueContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

function IssueForm() {
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
      navigate('/issuelist');
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Session expired. Please log in again.');
      } else {
        setError(err.response?.data?.error || 'Failed to create issue');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-white rounded-xl shadow-2xl p-8"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Create New Issue</h2>
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 mb-6 bg-red-50 p-3 rounded-lg flex items-center"
          >
            {error}
            {error.includes('Session expired') && (
              <button
                onClick={() => navigate('/login')}
                className="ml-4 bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-all duration-300"
              >
                Log In Again
              </button>
            )}
          </motion.p>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <motion.input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              whileFocus={{ scale: 1.02 }}
              placeholder="Enter issue title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <motion.textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 resize-y"
              rows="5"
              whileFocus={{ scale: 1.02 }}
              placeholder="Describe the issue"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Severity</label>
            <motion.select
              name="severity"
              value={formData.severity}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              whileFocus={{ scale: 1.02 }}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </motion.select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Priority</label>
            <motion.select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              whileFocus={{ scale: 1.02 }}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </motion.select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <motion.select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              whileFocus={{ scale: 1.02 }}
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Testing">Testing</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </motion.select>
          </div>
          <motion.button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Create Issue
          </motion.button>
        </form>
        <p className="mt-6 text-center text-gray-600">
          <a href="/issuelist" className="text-blue-600 hover:underline font-medium">
            Back to Issues
          </a>
        </p>
      </motion.div>
    </div>
  );
}

export default IssueForm;