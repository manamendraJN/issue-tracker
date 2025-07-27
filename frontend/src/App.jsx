import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';

function App() {
  return (
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/login" element={<div>Login Placeholder</div>} />
            <Route path="/register" element={<div>Register Placeholder</div>} />
            <Route path="/issuelist" element={<div>Issue List Placeholder</div>} />
            <Route path="/createissue" element={<div>Create Issue Placeholder</div>} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;