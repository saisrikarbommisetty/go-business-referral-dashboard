import React from 'react';
import styles from './OverviewCards.module.css';

// SVG Icons as inline components for maximum compatibility and visual match
const DollarIcon = () => (
  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <line x1="12" y1="1" x2="12" y2="23"></line>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
);

const CardIcon = () => (
  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
    <line x1="1" y1="10" x2="23" y2="10"></line>
  </svg>
);

const LinkIcon = () => (
  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
  </svg>
);

const HourglassIcon = () => (
  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 2h14"></path>
    <path d="M5 22h14"></path>
    <path d="M19 2v4c0 3.38-2.62 6-6 6-3.38 0-6-2.62-6-6V2"></path>
    <path d="M5 22v-4c0-3.38 2.62-6 6-6 3.38 0 6 2.62 6 6v4"></path>
  </svg>
);

const PercentIcon = () => (
  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <line x1="19" y1="5" x2="5" y2="19"></line>
    <circle cx="6.5" cy="6.5" r="2.5"></circle>
    <circle cx="17.5" cy="17.5" r="2.5"></circle>
  </svg>
);

const EarningIcon = () => (
  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
    <circle cx="12" cy="12" r="10"></circle>
  </svg>
);

const UsersIcon = () => (
  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const TransferIcon = () => (
  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <polyline points="17 1 21 5 17 9"></polyline>
    <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
    <polyline points="7 23 3 19 7 15"></polyline>
    <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
  </svg>
);

const getIconConfig = (label) => {
  const normLabel = label.toLowerCase();
  
  if (normLabel.includes('balance')) {
    return { icon: <DollarIcon />, color: '#4f46e5', bg: '#f0f0ff' };
  }
  if (normLabel.includes('percentage')) {
    return { icon: <CardIcon />, color: '#06b6d4', bg: '#ecfeff' };
  }
  if (normLabel.includes('total referral')) {
    return { icon: <LinkIcon />, color: '#6366f1', bg: '#f5f6ff' };
  }
  if (normLabel.includes('discount amount')) {
    return { icon: <HourglassIcon />, color: '#f59e0b', bg: '#fffbeb' };
  }
  if (normLabel.includes('commission amount')) {
    return { icon: <PercentIcon />, color: '#d946ef', bg: '#fdf4ff' };
  }
  if (normLabel.includes('total earning')) {
    return { icon: <EarningIcon />, color: '#f97316', bg: '#fff7ed' };
  }
  if (normLabel.includes('commission discount')) {
    return { icon: <UsersIcon />, color: '#8b5cf6', bg: '#f5f3ff' };
  }
  if (normLabel.includes('transfer')) {
    return { icon: <TransferIcon />, color: '#3b82f6', bg: '#eff6ff' };
  }
  
  // Default fallback
  return { icon: <DollarIcon />, color: '#4f46e5', bg: '#f0f0ff' };
};

const OverviewCards = ({ metrics = [] }) => {
  if (!metrics || metrics.length === 0) return null;

  return (
    <div className={styles.sectionCard}>
      <h2 className={styles.sectionTitle}>Overview</h2>
      <div className={styles.grid}>
        {metrics.map((metric, idx) => {
          const config = getIconConfig(metric.label);
          return (
            <div key={idx} className={styles.card}>
              <div 
                className={styles.iconWrapper} 
                style={{ backgroundColor: config.bg, color: config.color }}
              >
                {config.icon}
              </div>
              <div className={styles.value}>{metric.value}</div>
              <div className={styles.label}>{metric.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OverviewCards;
