import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IssueContext } from '../context/IssueContext';
import axios from 'axios';

function IssueDetail() {
  const { id } = useParams();
  const { issues, loadingIssues } = useContext(IssueContext);
  const [issue, setIssue] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (loadingIssues) return;
    const foundIssue = issues.find(issue => issue._id === id);
    if (foundIssue) {
      setIssue(foundIssue);
    } else {
      const fetchIssue = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/getissuebyid/${id}`);
          setIssue(response.data);
        } catch (err) {
          setError(err.response?.data?.error || 'Failed to fetch issue');
        }
      };
      fetchIssue();
    }
  }, [id, issues, loadingIssues]);

  if (loadingIssues) return <p className="container mx-auto p-4">Loading...</p>;
  if (error) return <p className="container mx-auto p-4 text-red-500">{error}</p>;
  if (!issue) return <p className="container mx-auto p-4">Issue not found</p>;

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h2 className="text-2xl font-bold mb-4">{issue.title}</h2>
      <p className="text-gray-600 mb-4">{issue.description}</p>
      <div className="mt-2 text-sm">
        <span className="mr-4"><strong>Severity:</strong> {issue.severity}</span>
        <span className="mr-4"><strong>Priority:</strong> {issue.priority}</span>
        <span><strong>Status:</strong> {issue.status}</span>
      </div>
      <button
        onClick={() => navigate('/issuelist')}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Back to List
      </button>
    </div>
  );
}

export default IssueDetail;