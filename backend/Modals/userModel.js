// models/userModel.js
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const config = require('../config');

const pool = mysql.createPool(config);
const promisePool = pool.promise();

// Create a new user
const createUser = async (username, email, password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await promisePool.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);
        return result.insertId;
    } catch (err) {
        throw new Error('Error creating user: ' + err.message);
    }
};

// Find a user by email
const findUserByEmail = async (email) => {
    try {
        const [rows] = await promisePool.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    } catch (err) {
        throw new Error('Error finding user: ' + err.message);
    }
};

module.exports = {
    createUser,
    findUserByEmail
};
