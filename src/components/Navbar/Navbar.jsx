import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import styles from './Navbar.module.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('jwt_token');
    navigate('/login');
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.brand}>
          Go Business
        </Link>
        <div className={styles.actions}>
          <button className={styles.btnTry}>Try for free</button>
          <button className={styles.btnLogout} onClick={handleLogout}>
            Log out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
