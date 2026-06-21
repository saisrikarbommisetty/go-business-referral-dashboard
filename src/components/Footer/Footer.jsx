import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>Go Business</div>
        <div className={styles.links}>
          <a href="#about" className={styles.link}>About</a>
          <a href="#contact" className={styles.link}>Contact</a>
          <a href="#privacy" className={styles.link}>Privacy</a>
          <a href="#terms" className={styles.link}>Terms</a>
        </div>
        <div className={styles.copyright}>&copy; 2026 Go Business, Inc.</div>
      </div>
    </footer>
  );
};

export default Footer;
