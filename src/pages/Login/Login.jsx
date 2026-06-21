import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { signin } from '../../services/api';
import styles from './Login.module.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const response = await signin(email, password);
      // Success response Format A: { data: { token: '...' } }
      // Success response Format B: { token: '...' }
      const token = response.data?.token || response.token;
      
      if (token) {
        Cookies.set('jwt_token', token, { expires: 7 }); // Cookie expires in 7 days
        navigate('/');
      } else {
        setErrorMsg('Authentication failed: token not received.');
      }
    } catch (err) {
      // Display the exact API error message
      const apiMsg = err.response?.data?.message || err.message || 'Something went wrong';
      setErrorMsg(apiMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.brand}>Go Business</h1>
          <p className={styles.tagline}>Sign in to open your referral dashboard.</p>
        </div>

        {errorMsg && (
          <div role="alert" className={styles.errorAlert}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="......"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
            />
          </div>

          <button 
            type="submit" 
            className={styles.btnSubmit}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
