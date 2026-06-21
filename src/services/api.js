import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = 'https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor to add Authorization Bearer token from cookies
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('jwt_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Sign in user
 * @param {string} email 
 * @param {string} password 
 */
export const signin = async (email, password) => {
  const response = await api.post('/api/auth/signin', { email, password });
  return response.data;
};

/**
 * Fetch referrals list with search and sort parameters
 * @param {object} params 
 * @param {string} params.search 
 * @param {string} params.sort 
 */
export const getReferrals = async (params = {}) => {
  const queryParams = {};
  if (params.search) {
    queryParams.search = params.search;
  }
  if (params.sort) {
    queryParams.sort = params.sort;
  }
  const response = await api.get('/api/referrals', { params: queryParams });
  return response.data;
};

/**
 * Fetch details of a single referral by ID
 * @param {string|number} id 
 */
export const getReferralDetails = async (id) => {
  const response = await api.get('/api/referrals', { params: { id } });
  return response.data;
};

export default api;
