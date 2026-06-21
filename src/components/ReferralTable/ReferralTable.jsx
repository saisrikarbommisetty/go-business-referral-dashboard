import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from '../Pagination/Pagination';
import { formatDate, formatProfit } from '../../utils/formatters';
import styles from './ReferralTable.module.css';

const ReferralTable = ({ referrals = [], onFilterChange }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;
  
  const isFirstRender = useRef(true);

  // Debounce search input changes
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const delayDebounce = setTimeout(() => {
      onFilterChange({ search: searchTerm, sort: sortBy });
      setCurrentPage(1); // Reset page on filter/search change
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);


  // Handle sort dropdown change
  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
    onFilterChange({ search: searchTerm, sort: value });
    setCurrentPage(1); // Reset page on sort change
  };

  // Client-side pagination calculations
  const totalEntries = referrals.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const indexOfLastRow = currentPage * entriesPerPage;
  const indexOfFirstRow = indexOfLastRow - entriesPerPage;
  const currentRows = referrals.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleRowClick = (id) => {
    navigate(`/referral/${id}`);
  };

  return (
    <div className={styles.sectionCard}>
      <div className={styles.header}>
        <h2 className={styles.sectionTitle}>All referrals</h2>
      </div>

      {/* Controls Row */}
      <div className={styles.controlsRow}>
        <div className={styles.searchGroup}>
          <label htmlFor="search-input" className={styles.controlLabel}>Search</label>
          <input
            id="search-input"
            type="text"
            placeholder="Name or service&hellip;"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        <div className={styles.sortGroup}>
          <label htmlFor="sort-select" className={styles.controlLabel}>Sort by date</label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={handleSortChange}
            className={styles.sortSelect}
          >
            <option value="desc">Newest first</option>
            <option value="asc">Oldest first</option>
          </select>
        </div>
      </div>

      {/* Table Container */}
      <div className={styles.tableResponsive}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>NAME</th>
              <th>SERVICE</th>
              <th>DATE</th>
              <th>PROFIT</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.length > 0 ? (
              currentRows.map((row) => (
                <tr 
                  key={row.id} 
                  onClick={() => handleRowClick(row.id)}
                  className={styles.clickableRow}
                >
                  <td className={styles.nameCell}>{row.name}</td>
                  <td>{row.serviceName}</td>
                  <td>{formatDate(row.date)}</td>
                  <td className={styles.profitCell}>{formatProfit(row.profit)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className={styles.noDataCell}>
                  No referrals found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination component */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalEntries={totalEntries}
        entriesPerPage={entriesPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ReferralTable;
