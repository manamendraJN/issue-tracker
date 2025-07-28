import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center mb-4 p-4 bg-gray-200">
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
  );
}

export default Navbar;