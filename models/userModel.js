// backend/models/userModel.js
const pool = require('../config/db');

const createUser = async (name, email, password) => {
    const { rows } = await pool.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
        [name, email, password]
    );
    return rows[0];
};

const getUserByEmail = async (email) => {
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return rows[0];
};

module.exports = { createUser, getUserByEmail };
