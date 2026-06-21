/**
 * Formats a date string from YYYY-MM-DD to YYYY/MM/DD.
 * @param {string} dateStr 
 * @returns {string}
 */
export function formatDate(dateStr) {
  if (!dateStr) return '';
  // Replace hyphens with forward slashes (e.g. 2024-07-15 -> 2024/07/15)
  return dateStr.replace(/-/g, '/');
}

/**
 * Formats a number as USD currency with no decimal places.
 * @param {number|string} amount 
 * @returns {string}
 */
export function formatProfit(amount) {
  const num = Number(amount);
  if (isNaN(num)) return '$0';
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(num);
}

/**
 * Defensively parses the API response, handling both Format A (wrapped in success/data)
 * and Format B (flat structure).
 * @param {object} responseBody - The response.data from Axios
 * @returns {object} The inner data object containing metrics, referrals, serviceSummary, etc.
 */
export function parseAPIResponse(responseBody) {
  if (!responseBody) return {};
  
  // Format A: { success: true, data: { ... } }
  if (responseBody.success && responseBody.data) {
    return responseBody.data;
  }
  
  // Format B or fallback: { metrics: [...], serviceSummary: {...}, ... }
  // If data property exists but success is not explicit (or is true), also extract data.
  if (responseBody.data && !responseBody.metrics && !responseBody.referrals) {
    return responseBody.data;
  }
  
  return responseBody;
}
