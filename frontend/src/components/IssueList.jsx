import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function IssueList() {
  const [issues, setIssues] = useState([]);
  const [error, setError] = useState(null);
  const { user, logout, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return; // Wait for AuthContext to settle
    if (!user) {
      navigate('/login');
      return;
    }
    const fetchIssues = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/getallissues');
        setIssues(response.data);
      } catch (err) {
        if (err.response?.status === 401) {
          setError('Session expired. Please log in again.');
        } else {
          setError(err.response?.data?.error || 'Failed to fetch issues');
        }
      }
    };
    fetchIssues();
  }, [user, navigate, logout, loading]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Issues</h2>
        {user && (
          <div>
            <span className="mr-4">Welcome, {user.email}</span>
            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        )}
      </div>
      {error && (
        <p className="text-red-500 mb-4">
          {error}
          {error.includes('Session expired') && (
            <button
              onClick={() => navigate('/login')}
              className="ml-2 bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
            >
              Log In Again
            </button>
          )}
        </p>
      )}
      {issues.length === 0 && !error ? (
        <p className="text-gray-500">No issues found.</p>
      ) : (
        <div className="grid gap-4">
          {issues.map((issue) => (
            <div key={issue._id} className="border rounded-lg p-4 bg-white shadow">
              <h3 className="text-lg font-semibold">{issue.title}</h3>
              <p className="text-gray-600">{issue.description}</p>
              <div className="mt-2 text-sm">
                <span className="mr-4"><strong>Severity:</strong> {issue.severity}</span>
                <span className="mr-4"><strong>Priority:</strong> {issue.priority}</span>
                <span><strong>Status:</strong> {issue.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}
      <a href="/createissue" className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Create New Issue
      </a>
    </div>
  );
}

export default IssueList;