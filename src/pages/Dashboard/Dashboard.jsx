import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import OverviewCards from '../../components/OverviewCards/OverviewCards';
import ServiceSummary from '../../components/ServiceSummary/ServiceSummary';
import ReferralShare from '../../components/ReferralShare/ReferralShare';
import ReferralTable from '../../components/ReferralTable/ReferralTable';
import { getReferrals } from '../../services/api';
import { parseAPIResponse } from '../../utils/formatters';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const [data, setData] = useState({
    metrics: [],
    serviceSummary: {},
    referral: {},
    referrals: []
  });
  const [loading, setLoading] = useState(true);
  const [firstLoad, setFirstLoad] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ search: '', sort: 'desc' });

  const fetchDashboardData = async (filterParams) => {
    try {
      setLoading(true);
      setError(null);
      const res = await getReferrals(filterParams);
      const parsedData = parseAPIResponse(res);
      setData({
        metrics: parsedData.metrics || [],
        serviceSummary: parsedData.serviceSummary || {},
        referral: parsedData.referral || {},
        referrals: parsedData.referrals || []
      });
    } catch (err) {
      const statusText = err.response?.status ? ` (Status Code: ${err.response.status})` : '';
      const apiMsg = err.response?.data?.message || err.message || 'Failed to load referral data';
      setError(`${apiMsg}${statusText}`);
    } finally {
      setLoading(false);
      setFirstLoad(false);
    }
  };

  // Fetch data on filter change (triggered by table Search/Sort)
  useEffect(() => {
    fetchDashboardData(filters);
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className={styles.pageLayout}>
      <Navbar />
      
      <main className={styles.mainContent}>
        <div className={styles.container}>
          {/* Header Section */}
          <div className={styles.header}>
            <h1 className={styles.title}>Referral Dashboard</h1>
            <p className={styles.subtitle}>
              Track your referrals, earnings, and partner activity in one place.
            </p>
          </div>

          {/* Error State */}
          {error && (
            <div role="alert" className={styles.errorAlert}>
              {error}
            </div>
          )}

          {/* Loading State */}
          {firstLoad && loading ? (
            <div className={styles.loadingWrapper}>
              <div className={styles.spinner}></div>
              <p>Loading your dashboard...</p>
            </div>
          ) : (
            <div className={styles.dashboardGrid}>
              <OverviewCards metrics={data.metrics} />
              
              <ServiceSummary serviceSummary={data.serviceSummary} />
              
              <ReferralShare referral={data.referral} />
              
              <div className={styles.tableContainer}>
                {loading && (
                  <div className={styles.tableOverlay}>
                    <div className={styles.spinner}></div>
                  </div>
                )}
                <ReferralTable 
                  referrals={data.referrals} 
                  onFilterChange={handleFilterChange} 
                />
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
