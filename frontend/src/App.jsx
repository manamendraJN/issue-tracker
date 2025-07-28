import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import AuthProvider from './context/AuthContext';
import IssueProvider from './context/IssueContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './components/Register';
import Login from './components/Login';
import IssueList from './components/IssueList';
import IssueForm from './components/IssueForm';
import IssueDetail from './components/IssueDetail';
import Navbar from './components/Navbar';

function App() {
  return (
    <AuthProvider>
      <IssueProvider>
        <Router>
          <div className="min-h-screen bg-gray-100">
            <Navbar />
            <ToastContainer
              position="bottom-left"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/issuelist" element={<IssueList />} />
              <Route path="/createissue" element={<IssueForm />} />
              <Route path="/issuedetail/:id" element={<IssueDetail />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </div>
        </Router>
      </IssueProvider>
    </AuthProvider>
  );
}

export default App;