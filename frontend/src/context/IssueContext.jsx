import { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import axios from 'axios';

export const IssueContext = createContext();

const IssueProvider = ({ children }) => {
  const { user, loading, token } = useContext(AuthContext);
  const [issues, setIssues] = useState([]);
  const [loadingIssues, setLoadingIssues] = useState(true);

  useEffect(() => {
    if (loading || !user || !token) return; // Wait for token to be set
    const fetchIssues = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/getallissues');
        setIssues(response.data);
      } catch (err) {
        console.error('Failed to fetch issues:', err);
      } finally {
        setLoadingIssues(false);
      }
    };
    fetchIssues();
  }, [user, loading, token]);

  const updateIssue = (updatedIssue) => {
    setIssues(issues.map(issue => issue._id === updatedIssue._id ? updatedIssue : issue));
  };

  const deleteIssue = (issueId) => {
    setIssues(issues.filter(issue => issue._id !== issueId));
  };

  return (
    <IssueContext.Provider value={{ issues, loadingIssues, updateIssue, deleteIssue }}>
      {children}
    </IssueContext.Provider>
  );
};
export default IssueProvider;