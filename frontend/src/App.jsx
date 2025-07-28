import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import AuthProvider from './context/AuthContext';
import Register from './components/Register';
import Login from './components/Login';
import IssueList from './components/IssueList';
import IssueForm from './components/IssueForm';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/issuelist" element={<IssueList/>} />
            <Route path="/createissue" element={<IssueForm/>} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;