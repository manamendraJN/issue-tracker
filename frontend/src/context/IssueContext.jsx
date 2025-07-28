import { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import axios from 'axios';

export const IssueContext = createContext();

const IssueProvider = ({ children }) => {
  const { user, loading, token } = useContext(AuthContext);
  const [issues, setIssues] = useState([]);
  const [loadingIssues, setLoadingIssues] = useState(true);

  const fetchIssues = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/getallissues', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setIssues(response.data);
    } catch (err) {
      console.error('Failed to fetch issues:', err);
    } finally {
      setLoadingIssues(false);
    }
  };

  useEffect(() => {
    if (loading || !user || !token) return;
    fetchIssues();
  }, [user, loading, token]);

  const addIssue = async (issueData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/createissue', issueData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setIssues([response.data, ...issues]);
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  const updateIssue = (updatedIssue) => {
    setIssues(issues.map(issue => issue._id === updatedIssue._id ? updatedIssue : issue));
  };

  const deleteIssue = (issueId) => {
    setIssues(issues.filter(issue => issue._id !== issueId));
  };

  return (
    <IssueContext.Provider value={{ issues, loadingIssues, addIssue, updateIssue, deleteIssue }}>
      {children}
    </IssueContext.Provider>
  );
};

export default IssueProvider;