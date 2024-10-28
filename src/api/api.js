import axios from 'axios';

// Set this to your PHP backend URL
const API_URL = 'http://localhost/sms-api'; // Base URL for your backend

export const getMetrics = async () => {
  return await axios.get(`${API_URL}/metrics.php`); // Ensure this endpoint exists
};

export const startSession = async (session) => {
  return await axios.post(`${API_URL}/start.php`, session); // Ensure this endpoint exists
};

export const stopSession = async (session) => {
  return await axios.post(`${API_URL}/stop.php`, session); // Ensure this endpoint exists
};

export const getCountryOperators = async () => {
  return await axios.get(`${API_URL}/country-operators.php`); // Ensure this endpoint exists
};

export const addCountryOperator = async (operator) => {
  return await axios.post(`${API_URL}/country-operators.php`, operator); // Ensure this endpoint exists
};

export const updateCountryOperator = async (id, operator) => {
  return await axios.put(`${API_URL}/country-operators.php?id=${id}`, operator); // Ensure this endpoint exists
};

export const deleteCountryOperator = async (id) => {
  return await axios.delete(`${API_URL}/country-operators.php?id=${id}`); // Ensure this endpoint exists
};

// Update the login function to match your PHP login script
export const loginUser = async (credentials) => {
  return await axios.post(`${API_URL}/login.php`, credentials, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
