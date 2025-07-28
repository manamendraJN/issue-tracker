import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { IssueContext } from '../context/IssueContext';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function IssueList() {
  const [error, setError] = useState(null);
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

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl bg-white rounded-xl shadow-2xl p-8"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Your Issues</h2>
          <motion.a
            href="/createissue"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Create New Issue
          </motion.a>
        </div>

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

        {loadingIssues ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-500 text-lg"
          >
            Loading issues...
          </motion.p>
        ) : issues.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-500 text-lg"
          >
            No issues found. Start by creating a new issue!
          </motion.p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {issues.map((issue) => (
              <motion.div
                key={issue._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="border rounded-lg p-5 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-lg font-semibold mb-2">
                  <Link
                    to={`/issuedetail/${issue._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {issue.title}
                  </Link>
                </h3>
                <p className="text-gray-600 mb-3 line-clamp-2">{issue.description}</p>
                <div className="text-sm text-gray-500 flex flex-wrap gap-4">
                  <span><strong>Severity:</strong> {issue.severity}</span>
                  <span><strong>Priority:</strong> {issue.priority}</span>
                  <span><strong>Status:</strong> {issue.status}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default IssueList;