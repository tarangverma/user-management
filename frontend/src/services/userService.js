import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL;

export const loginUser = async (email, password) => {
  const { data } = await axios.post(`${API_URL}/login`, { email, password });
  return data; // { token }
};

// Sign Up API call
export const signUpUser = async (name, email, password) => {
    const { data } = await axios.post(`${API_URL}/signup`, { name, email, password });
    return data; // Handle success response
  };

export const fetchUsers = async (token) => {
  const { data } = await axios.get(`${API_URL}/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data; // List of users
};

export const updateUser = async (userId, userData, token) => {
  const { data } = await axios.put(`${API_URL}/users/${userId}`, userData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data; // Updated user data
};

export const deleteUser = async (userId, token) => {
  const { data } = await axios.delete(`${API_URL}/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data; // Deletion confirmation
};

export const createUser = async (userData, token) => {
  const { data } = await axios.post(`${API_URL}/users`, userData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data; // New user data
};
