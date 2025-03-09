const express = require("express");
const router = express.Router();
const { getUserByEmail } = require("./models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Vérifier si JWT_SECRET est défini
if (!process.env.JWT_SECRET) {
    console.error("❌ Erreur : La clé JWT_SECRET n'est pas définie !");
    process.exit(1);
}

// Route de connexion
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Vérifier si l'utilisateur existe
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(400).json({ message: "Utilisateur non trouvé" });
        }

        // Vérifier le mot de passe
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Mot de passe incorrect" });
        }

        // ✅ Générer un token JWT
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" } // Durée de validité
        );

        console.log("🔑 Token généré :", token);

        res.json({ 
            token, 
            user: { id: user.id, name: user.name, email: user.email } 
        });

    } catch (error) {
        console.error("❌ Erreur serveur :", error.message);
        res.status(500).json({ message: "Erreur serveur" });
    }
});

module.exports = router;
