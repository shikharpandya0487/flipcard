// models/userModel.js
const mysql = require('mysql2');
const config = require('../config');

// Create a connection pool
const pool = mysql.createPool(config);
const promisePool = pool.promise();

// Get all users
const getAllUsers = async () => {
    try {
        const [rows] = await promisePool.query('SELECT * FROM users');
        return rows;
    } catch (err) {
        throw new Error('Error fetching users: ' + err.message);
    }
};

// Create a user
const createUser = async (user) => {
    try {
        const { name, email } = user;
        const [result] = await promisePool.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
        return result.insertId;
    } catch (err) {
        throw new Error('Error creating user: ' + err.message);
    }
};

// Update a user
const updateUser = async (id, user) => {
    try {
        const { name, email } = user;
        await promisePool.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id]);
    } catch (err) {
        throw new Error('Error updating user: ' + err.message);
    }
};

// Delete a user
const deleteUser = async (id) => {
    try {
        await promisePool.query('DELETE FROM users WHERE id = ?', [id]);
    } catch (err) {
        throw new Error('Error deleting user: ' + err.message);
    }
};

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
};
