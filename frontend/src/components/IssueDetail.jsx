import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IssueContext } from '../context/IssueContext';
import axios from 'axios';
import { toast } from 'react-toastify';

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

  if (loadingIssues) return <p className="container mx-auto p-4">Loading...</p>;
  if (error) return <p className="container mx-auto p-4 text-red-500">{error}</p>;
  if (!issue) return <p className="container mx-auto p-4">Issue not found</p>;

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h2 className="text-2xl font-bold mb-4">{issue.title}</h2>
      {!isEditing ? (
        <>
          <p className="text-gray-600 mb-4">{issue.description}</p>
          <div className="mt-2 text-sm">
            <span className="mr-4"><strong>Severity:</strong> {issue.severity}</span>
            <span className="mr-4"><strong>Priority:</strong> {issue.priority}</span>
            <span><strong>Status:</strong> {issue.status}</span>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 mr-2"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Delete
          </button>
        </>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title || ''}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Severity</label>
            <select
              name="severity"
              value={formData.severity || 'Low'}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Priority</label>
            <select
              name="priority"
              value={formData.priority || 'Low'}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Status</label>
            <select
              name="status"
              value={formData.status || 'Open'}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Testing">Testing</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="ml-2 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Cancel
          </button>
        </form>
      )}
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