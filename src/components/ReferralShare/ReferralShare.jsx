import React, { useState } from 'react';
import styles from './ReferralShare.module.css';

const ReferralShare = ({ referral = {} }) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Defensive values
  const linkValue = referral?.link || referral?.referralLink || '';
  const codeValue = referral?.code || referral?.referralCode || '';

  const handleCopyLink = () => {
    if (!linkValue) return;
    navigator.clipboard.writeText(linkValue).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    });
  };

  const handleCopyCode = () => {
    if (!codeValue) return;
    navigator.clipboard.writeText(codeValue).then(() => {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    });
  };

  return (
    <div className={styles.sectionCard}>
      <h2 className={styles.sectionTitle}>Refer friends and earn more</h2>
      <div className={styles.grid}>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>YOUR REFERRAL LINK</label>
          <div className={styles.inputWrapper}>
            <input 
              type="text" 
              readOnly 
              value={linkValue} 
              className={styles.input} 
            />
            <button 
              type="button" 
              onClick={handleCopyLink} 
              className={styles.btnCopy}
            >
              {copiedLink ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>YOUR REFERRAL CODE</label>
          <div className={styles.inputWrapper}>
            <input 
              type="text" 
              readOnly 
              value={codeValue} 
              className={styles.input} 
            />
            <button 
              type="button" 
              onClick={handleCopyCode} 
              className={styles.btnCopy}
            >
              {copiedCode ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralShare;
