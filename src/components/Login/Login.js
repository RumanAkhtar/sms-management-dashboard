import React, { useState } from 'react';
import './Login.css';
import { loginUser } from '../../api/api';

const Login = ({ setUser }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await loginUser(credentials);
      if (response.status === 200) {
        setUser(response.data); // Call setUser from props
      }
    } catch (error) {
      setError('An error occurred during login. Please try again.');
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <input
        type="text"
        placeholder="Username"
        value={credentials.username}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
