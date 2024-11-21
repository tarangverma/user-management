const pool = require('../database/db');

// Fetch all users
const getAllUsers = async () => {
  const result = await pool.query('SELECT id, name, email, role, created_at FROM users');
  return result.rows;
};

// Fetch user by email
const getUserByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

// Create new user
const createUser = async (name, email, password, role = 'user') => {
  const result = await pool.query(
    'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role, created_at',
    [name, email, password, role]
  );
  return result.rows[0];
};

// Update user
const updateUser = async (id, name, email, role) => {
  const result = await pool.query(
    'UPDATE users SET name = $1, email = $2, role = $3, updated_at = NOW() WHERE id = $4 RETURNING *',
    [name, email, role, id]
  );
  return result.rows[0];
};

// Delete user
const deleteUser = async (id) => {
  await pool.query('DELETE FROM users WHERE id = $1', [id]);
};

module.exports = { getAllUsers, getUserByEmail, createUser, updateUser, deleteUser };
