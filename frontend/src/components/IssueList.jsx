import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { IssueContext } from '../context/IssueContext';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaSignOutAlt, FaTimes } from 'react-icons/fa';
import IssueForm from './IssueForm';

function IssueList() {
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, logout, loading } = useContext(AuthContext);
  const { issues, loadingIssues } = useContext(IssueContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading || loadingIssues) return;
    if (!user) {
      navigate('/login');
      return;
    }
  }, [user, navigate, loading, loadingIssues]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-5xl bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-10"
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white tracking-tight">Your Issues</h2>
          <div className="flex gap-4">
            <motion.button
              onClick={openModal}
              className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              aria-label="Create new issue"
            >
              <FaPlus className="mr-2" />
              New Issue
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-red-300 bg-red-500/20 p-4 rounded-lg mb-6 text-sm flex items-center"
            >
              {error}
              {error.includes('Session expired') && (
                <button
                  onClick={() => navigate('/login')}
                  className="ml-4 bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300"
                >
                  Sign In Again
                </button>
              )}
            </motion.p>
          )}
        </AnimatePresence>

        {loadingIssues ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-300 text-lg text-center"
          >
            Loading issues...
          </motion.p>
        ) : issues.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-300 text-lg text-center"
          >
            No issues found. Start by creating a new issue!
          </motion.p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {issues.map((issue) => (
              <motion.div
                key={issue._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="border border-gray-700 rounded-lg p-5 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 mt-4"
              >
                <h3 className="text-lg font-semibold text-white mb-2">
                  <Link
                    to={`/issuedetail/${issue._id}`}
                    className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                  >
                    {issue.title}
                  </Link>
                </h3>
                <p className="text-gray-300 mb-3 line-clamp-2 text-sm">{issue.description}</p>
                <div className="text-sm text-gray-400 flex flex-wrap gap-4">
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
              </motion.div>
            ))}
          </div>
        )}

        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 flex rounded-2xl items-center justify-center p-4 z-50 "
              onClick={closeModal}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-lg bg-gray-800 rounded-2xl shadow-2xl p-6 mt-14"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300"
                  aria-label="Close modal"
                >
                  <FaTimes size={24} />
                </button>
                <IssueForm closeModal={closeModal} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default IssueList;