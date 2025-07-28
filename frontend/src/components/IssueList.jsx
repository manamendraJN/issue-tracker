import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { IssueContext } from '../context/IssueContext';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaTimes, FaSearch } from 'react-icons/fa';
import IssueForm from './IssueForm';

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

function IssueList() {
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSeverity, setFilterSeverity] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const { user, loading } = useContext(AuthContext);
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

  // Filter issues based on search term and dropdown selections
  const filteredIssues = issues.filter((issue) => {
    const matchesSearch =
      issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = !filterSeverity || issue.severity === filterSeverity;
    const matchesPriority = !filterPriority || issue.priority === filterPriority;
    const matchesStatus = !filterStatus || issue.status === filterStatus;
    return matchesSearch && matchesSeverity && matchesPriority && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <style>{selectOptionStyles}</style>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-5xl bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-10 mt-14"
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

        {/* Search and Filter Controls */}
        <div className="mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <motion.input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search issues ..."
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                whileFocus={{ scale: 1.01 }}
                aria-label="Search issues"
              />
            </div>
            <div className="relative">
              <motion.select
                value={filterSeverity}
                onChange={(e) => setFilterSeverity(e.target.value)}
                className="w-full pl-4 pr-4 py-2 bg-white/5 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                whileFocus={{ scale: 1.01 }}
                aria-label="Filter by severity"
              >
                <option value="">All Severities</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </motion.select>
            </div>
            <div className="relative">
              <motion.select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="w-full pl-4 pr-4 py-2 bg-white/5 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                whileFocus={{ scale: 1.01 }}
                aria-label="Filter by priority"
              >
                <option value="">All Priorities</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </motion.select>
            </div>
            <div className="relative">
              <motion.select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full pl-4 pr-4 py-2 bg-white/5 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                whileFocus={{ scale: 1.01 }}
                aria-label="Filter by status"
              >
                <option value="">All Statuses</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Testing">Testing</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>
              </motion.select>
            </div>
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
        ) : filteredIssues.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-300 text-lg text-center"
          >
            {searchTerm || filterSeverity || filterPriority || filterStatus
              ? 'No issues match your filters.'
              : 'No issues found. Start by creating a new issue!'}
          </motion.p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredIssues.map((issue) => (
              <Link to={`/issuedetail/${issue._id}`} key={issue._id}>
                <motion.div
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border border-gray-700 rounded-lg p-5 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 mt-4"
                >
                  <h3 className="text-lg font-semibold text-white mb-2">{issue.title}</h3>
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
              </Link>
            ))}
          </div>
        )}

        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 flex items-center rounded-2xl justify-center p-4 z-50"
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