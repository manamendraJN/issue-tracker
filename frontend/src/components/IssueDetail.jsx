import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IssueContext } from '../context/IssueContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

function IssueDetail() {
  const { id } = useParams();
  const { issues, updateIssue, deleteIssue, loadingIssues } = useContext(IssueContext);
  const [issue, setIssue] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
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
      const response = await axios.put(`http://localhost:5000/api/updateissue/${id}`, formData);
      updateIssue(response.data);
      toast.success('Issue updated successfully!');
      setIsEditing(false);
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

  if (loadingIssues) {
    return (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto p-4 text-gray-500 text-lg"
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
        className="container mx-auto p-4 text-red-500 bg-red-50 p-3 rounded-lg"
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
        className="container mx-auto p-4 text-gray-500 text-lg"
      >
        Issue not found
      </motion.p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-white rounded-xl shadow-2xl p-8"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6">{issue.title}</h2>
        {!isEditing ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-gray-600 mb-4">{issue.description}</p>
            <div className="text-sm text-gray-500 flex flex-wrap gap-4 mb-6">
              <span><strong>Severity:</strong> {issue.severity}</span>
              <span><strong>Priority:</strong> {issue.priority}</span>
              <span><strong>Status:</strong> {issue.status}</span>
            </div>
            <div className="flex gap-3">
              <motion.button
                onClick={() => setIsEditing(true)}
                className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Edit
              </motion.button>
              <motion.button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Delete
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <motion.input
                type="text"
                name="title"
                value={formData.title || ''}
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
                value={formData.description || ''}
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
                value={formData.severity || 'Low'}
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
                value={formData.priority || 'Low'}
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
                value={formData.status || 'Open'}
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
            <div className="flex gap-3">
              <motion.button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Save Changes
              </motion.button>
              <motion.button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Cancel
              </motion.button>
            </div>
          </motion.form>
        )}
        <motion.p
          className="mt-6 text-center text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <a
            href="/issuelist"
            className="text-blue-600 hover:underline font-medium"
          >
            Back to Issues
          </a>
        </motion.p>
      </motion.div>
    </div>
  );
}

export default IssueDetail;