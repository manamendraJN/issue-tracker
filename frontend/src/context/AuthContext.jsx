import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../config';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const storedToken = localStorage.getItem('token');
  const storedUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

  const [user, setUser] = useState(storedUser); // Will store { _id, email }
  const [token, setToken] = useState(storedToken);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
      if (user?._id && user?.email) {
        localStorage.setItem('user', JSON.stringify(user));
      }
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    setLoading(false);
  }, [token, user]);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      const newToken = response.data.token;
      const userObj = response.data.user; // { _id, email }

      setToken(newToken);
      setUser(userObj);
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(userObj));
    } catch (err) {
      throw new Error(err.response?.data?.error || 'Login failed');
    }
  };

  const register = async (email, password) => {
    try {
      await axios.post(`${API_URL}/auth/register`, { email, password });
    } catch (err) {
      throw new Error(err.response?.data?.error || 'Registration failed');
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
