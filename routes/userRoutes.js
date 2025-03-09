const express = require('express');
const router = express.Router();
const { createUser, getUserByEmail } = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register route
router.post('/register', async (req, res) => {
    console.log('Received data:', req.body); // Ajoute cette ligne

    const { name, email, password } = req.body;
    try {
        const existingUser = await getUserByEmail(email);
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await createUser(name, email, hashedPassword);
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error); // Ajoute cette ligne pour voir l'erreur exacte
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;
