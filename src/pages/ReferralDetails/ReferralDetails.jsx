import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import { getReferralDetails } from '../../services/api';
import { parseAPIResponse, formatDate, formatProfit } from '../../utils/formatters';
import styles from './ReferralDetails.module.css';

const ReferralDetails = () => {
  const { id } = useParams();
  const [referral, setReferral] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await getReferralDetails(id);
        console.log('--- DEBUG REFERRAL DETAILS ---');
        console.log('Requested ID:', id);
        console.log('Raw API Response (res):', res);

        if (res && res.success === false) {
          throw new Error(res.message || 'Failed to fetch referral details');
        }

        const parsedData = parseAPIResponse(res);
        console.log('Parsed Data:', parsedData);

        let foundReferral = null;

        if (parsedData.referrals && Array.isArray(parsedData.referrals)) {
          // 1. Nested referrals array (Prioritized to avoid matching the sharing referral link/code object)
          foundReferral = parsedData.referrals.find(r => String(r?.id) === String(id)) || parsedData.referrals[0];
        } else if (Array.isArray(parsedData)) {
          // 2. Directly an array
          foundReferral = parsedData.find(r => String(r?.id) === String(id)) || parsedData[0];
        } else if (parsedData.referral && typeof parsedData.referral === 'object' && (parsedData.referral.id !== undefined || parsedData.referral.name !== undefined)) {
          // 3. Nested referral object (only if it has partner-like fields)
          foundReferral = parsedData.referral;
        } else if (parsedData.id !== undefined || parsedData.name !== undefined) {
          // 4. Flat object itself
          foundReferral = parsedData;
        } else if (parsedData.data) {
          // 5. Double data wrapping fallback
          const innerData = parsedData.data;
          if (Array.isArray(innerData)) {
            foundReferral = innerData.find(r => String(r?.id) === String(id)) || innerData[0];
          } else if (innerData.referrals) {
            foundReferral = innerData.referrals.find(r => String(r?.id) === String(id)) || innerData.referrals[0];
          } else if (innerData.referral && typeof innerData.referral === 'object' && (innerData.referral.id !== undefined || innerData.referral.name !== undefined)) {
            foundReferral = innerData.referral;
          } else if (innerData.id !== undefined) {
            foundReferral = innerData;
          }
        }

        console.log('Found Referral:', foundReferral);

        // Set state if we found a valid-looking referral record
        if (foundReferral && (foundReferral.id !== undefined || foundReferral.name)) {
          setReferral(foundReferral);
        } else {
          setReferral(null); // Will trigger Referral not found UI
        }
      } catch (err) {
        // Display exact API message and status code if available
        const statusText = err.response?.status ? ` (Status Code: ${err.response.status})` : '';
        const apiMsg = err.response?.data?.message || err.message || 'Failed to fetch referral details';
        setError(`${apiMsg}${statusText}`);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDetails();
    }
  }, [id]);

  return (
    <div className={styles.pageLayout}>
      <Navbar />

      <main className={styles.mainContent}>
        <div className={styles.container}>
          {/* Back link */}
          <Link to="/" className={styles.backLink}>
            &larr; Back to dashboard
          </Link>

          {/* Heading */}
          <div className={styles.header}>
            <h1 className={styles.title}>Referral Details</h1>
            <p className={styles.subtitle}>Full information for this referral partner.</p>
          </div>

          {/* Error Alert */}
          {error && (
            <div role="alert" className={styles.errorAlert}>
              {error}
            </div>
          )}

          {/* Loading / Data States */}
          {loading ? (
            <div className={styles.loadingWrapper}>
              <div className={styles.spinner}></div>
              <p>Loading referral details...</p>
            </div>
          ) : error ? (
            <div className={styles.notFoundCard}>
              <h2 className={styles.notFoundTitle} style={{ color: '#ef4444' }}>Error Loading Details</h2>
              <p className={styles.notFoundText}>
                We encountered an error while communicating with the server:<br />
                <strong>{error}</strong>
              </p>
              <Link to="/" className={styles.btnHome} style={{ backgroundColor: '#ef4444' }}>
                Back to dashboard
              </Link>
            </div>
          ) : referral ? (
            <div className={styles.detailsCard}>
              <div className={styles.cardHeader}>
                <h2 className={styles.partnerName}>{referral.name}</h2>
                {referral.serviceName && (
                  <span className={styles.badge}>{referral.serviceName}</span>
                )}
              </div>

              <div className={styles.detailsList}>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>REFERRAL ID</span>
                  <span className={styles.detailValue}>{referral.id}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>NAME</span>
                  <span className={styles.detailValue}>{referral.name}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>SERVICE NAME</span>
                  <span className={styles.detailValue}>{referral.serviceName || '—'}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>DATE</span>
                  <span className={styles.detailValue}>{formatDate(referral.date)}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>PROFIT</span>
                  <span className={styles.detailValueHighlight}>
                    {formatProfit(referral.profit)}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.notFoundCard}>
              <h2 className={styles.notFoundTitle}>Referral not found</h2>
              <p className={styles.notFoundText}>
                We couldn't find a referral with ID "{id}". It may have been deleted or the ID is invalid.
              </p>
              <Link to="/" className={styles.btnHome}>
                Back to dashboard
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ReferralDetails;
