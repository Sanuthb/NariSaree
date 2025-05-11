import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice'; // Assuming it's the correct path

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });

    if (response.data.token) {
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      dispatch(login({ token, user }));

      // Redirect based on role
      if (user.role === 'admin') {
        navigate('/admindashboard');
      } else {
        navigate('/');
      }
    } else {
      alert('Invalid credentials. Please try again.');
    }
  } catch (error) {
    console.error('Error during login:', error);
    alert('Invalid credentials. Please try again.');
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-[#8eab92] mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border p-2 rounded mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border p-2 rounded mt-1"
            />
          </div>
          <button type="submit" className="w-full bg-[#8eab92] text-white py-2 rounded hover:bg-[#769d84]">
            Login
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          Don't have an account? <Link to="/register" className="text-[#8eab92] underline">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
