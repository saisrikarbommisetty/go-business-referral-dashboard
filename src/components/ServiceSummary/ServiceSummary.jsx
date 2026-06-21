import React from 'react';
import styles from './ServiceSummary.module.css';

const ServiceSummary = ({ serviceSummary = {} }) => {
  // Defensive key mapping with sensible fallbacks
  const serviceName = serviceSummary?.serviceName || serviceSummary?.service || '—';
  const yourReferrals = serviceSummary?.yourReferrals || serviceSummary?.referrals || '0 + 0';
  const activeReferrals = serviceSummary?.activeReferrals || serviceSummary?.active || '0 + 0';
  const totalEarnings = serviceSummary?.totalEarnings || serviceSummary?.earnings || serviceSummary?.totalRefEarnings || '$0.00';

  return (
    <div className={styles.sectionCard}>
      <h2 className={styles.sectionTitle}>Service summary</h2>
      <div className={styles.grid}>
        <div className={styles.card}>
          <div className={styles.label}>SERVICE</div>
          <div className={`${styles.value} ${styles.serviceValue}`}>{serviceName}</div>
        </div>
        <div className={styles.card}>
          <div className={styles.label}>YOUR REFERRALS</div>
          <div className={styles.value}>{yourReferrals}</div>
        </div>
        <div className={styles.card}>
          <div className={styles.label}>ACTIVE REFERRALS</div>
          <div className={styles.value}>{activeReferrals}</div>
        </div>
        <div className={styles.card}>
          <div className={styles.label}>TOTAL REF. EARNINGS</div>
          <div className={styles.value}>{totalEarnings}</div>
        </div>
      </div>
    </div>
  );
};

export default ServiceSummary;
