import React from 'react';
import styles from './Pagination.module.css';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  totalEntries, 
  entriesPerPage = 10, 
  onPageChange 
}) => {
  if (totalEntries === 0) return null;

  const startEntry = (currentPage - 1) * entriesPerPage + 1;
  const endEntry = Math.min(currentPage * entriesPerPage, totalEntries);

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className={styles.paginationWrapper}>
      <div className={styles.infoText}>
        Showing {startEntry}&ndash;{endEntry} of {totalEntries} entries
      </div>
      <div className={styles.controls}>
        <button 
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={styles.btnPrevNext}
        >
          Previous
        </button>
        {getPageNumbers().map(pageNum => (
          <button 
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`${styles.pageBtn} ${currentPage === pageNum ? styles.active : ''}`}
          >
            {pageNum}
          </button>
        ))}
        <button 
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          className={styles.btnPrevNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
