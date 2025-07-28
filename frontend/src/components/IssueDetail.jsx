import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { IssueContext } from '../context/IssueContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeading, FaAlignLeft, FaExclamationCircle, FaFlag, FaTasks, FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';

// Custom CSS to style select options
const selectOptionStyles = `
  select option {
    background-color: #1f2937;
    color: white;
    padding: 8px;
  }
  select option:hover {
    background-color: #374151;
  }
`;

function IssueDetail() {
  const { id } = useParams();
  const { issues, updateIssue, deleteIssue, loadingIssues } = useContext(IssueContext);
  const [issue, setIssue] = useState(null);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (loadingIssues) return;
    const foundIssue = issues.find(issue => issue._id === id);
    if (foundIssue) {
      setIssue(foundIssue);
      setFormData(foundIssue);
    } else {
      const fetchIssue = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/getissuebyid/${id}`);
          setIssue(response.data);
          setFormData(response.data);
        } catch (err) {
          setError(err.response?.data?.error || 'Failed to fetch issue');
        }
      };
      fetchIssue();
    }
  }, [id, issues, loadingIssues]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/updateissue/${id}`, {
        ...formData,
        title: issue.title, // Ensure title remains unchanged
        description: issue.description // Ensure description remains unchanged
      });
      updateIssue(response.data);
      toast.success('Issue updated successfully!');
      setIsModalOpen(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update issue');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this issue?')) {
      try {
        await axios.delete(`http://localhost:5000/api/deleteissue/${id}`);
        deleteIssue(id);
        toast.success('Issue deleted successfully!');
        navigate('/issuelist');
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to delete issue');
      }
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (loadingIssues) {
    return (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto p-4 text-gray-300 text-lg text-center"
      >
        Loading...
      </motion.p>
    );
  }

  if (error) {
    return (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto p-4 text-red-300 bg-red-500/20 p-4 rounded-lg text-sm"
      >
        {error}
      </motion.p>
    );
  }

  if (!issue) {
    return (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto p-4 text-gray-300 text-lg text-center"
      >
        Issue not found
      </motion.p>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <style>{selectOptionStyles}</style>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-2xl bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-10"
      >
        <h2 className="text-3xl font-bold text-white mb-8 tracking-tight">{issue.title}</h2>
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-gray-300 mb-6 text-sm">{issue.description}</p>
          <div className="text-sm text-gray-400 flex flex-wrap gap-4 mb-6">
            <span>
              <strong>Severity:</strong>{' '}
              <span
                className={
                  issue.severity === 'High'
                    ? 'text-red-400'
                    : issue.severity === 'Medium'
                    ? 'text-yellow-400'
                    : 'text-green-400'
                }
              >
                {issue.severity}
              </span>
            </span>
            <span>
              <strong>Priority:</strong>{' '}
              <span
                className={
                  issue.priority === 'High'
                    ? 'text-red-400'
                    : issue.priority === 'Medium'
                    ? 'text-yellow-400'
                    : 'text-green-400'
                }
              >
                {issue.priority}
              </span>
            </span>
            <span>
              <strong>Status:</strong>{' '}
              <span
                className={
                  issue.status === 'Open'
                    ? 'text-blue-400'
                    : issue.status === 'In Progress'
                    ? 'text-yellow-400'
                    : 'text-green-400'
                }
              >
                {issue.status}
              </span>
            </span>
          </div>
          <div className="flex gap-3">
            <motion.button
              onClick={openModal}
              className="flex items-center bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              aria-label="Edit issue"
            >
              <FaEdit className="mr-2" />
              Edit
            </motion.button>
            <motion.button
              onClick={handleDelete}
              className="flex items-center bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              aria-label="Delete issue"
            >
              <FaTrash className="mr-2" />
              Delete
            </motion.button>
          </div>
        </motion.div>
        <p className="mt-6 text-center text-gray-300 text-sm">
          <Link
            to="/issuelist"
            className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
          >
            Back to Issues
          </Link>
        </p>
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
              onClick={closeModal}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-lg bg-gray-800 rounded-2xl shadow-2xl p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300"
                  aria-label="Close modal"
                >
                  <FaTimes size={24} />
                </button>
                <div className="flex flex-col">
                  <h2 className="text-2xl font-bold text-white mb-6 tracking-tight">Edit Issue</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-1">Title</label>
                      <div className="flex items-center text-white text-sm bg-white/5 border border-gray-600 rounded-lg p-3">
                        <FaHeading className="mr-3 text-gray-400" />
                        {formData.title || ''}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-1">Description</label>
                      <div className="flex text-white text-sm bg-white/5 border border-gray-600 rounded-lg p-3">
                        <FaAlignLeft className="mr-3 text-gray-400 mt-1" />
                        <span className="whitespace-pre-wrap">{formData.description || ''}</span>
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
                          value={formData.severity || 'Low'}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2 bg-white/5 border border-gray-600 rounded-lg text-white focus:border-white focus:outline-none transition-all duration-300 appearance-none"
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
                          value={formData.priority || 'Low'}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2 bg-white/5 border border-gray-600 rounded-lg text-white focus:border-white focus:outline-none transition-all duration-300 appearance-none"
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
                          value={formData.status || 'Open'}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2 bg-white/5 border border-gray-600 rounded-lg text-white focus:border-white focus:outline-none transition-all duration-300 appearance-none"
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
                        aria-label="Save changes"
                      >
                        <FaSave className="mr-2" />
                        Save Changes
                      </motion.button>
                      <motion.button
                        type="button"
                        onClick={closeModal}
                        className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 text-base font-medium"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        aria-label="Cancel"
                      >
                        <FaTimes className="mr-2" />
                        Cancel
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default IssueDetail;