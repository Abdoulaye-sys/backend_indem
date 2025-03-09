const express = require("express");
const pool = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Récupérer les indemnisations d'un utilisateur connecté
router.get("/", authMiddleware, async (req, res) => {
    try {
        const { email } = req.user; // Récupération de l'utilisateur connecté

        // Récupérer les indemnisations de cet utilisateur
        const result = await pool.query(
            "SELECT * FROM indemnisations WHERE user_email = $1",
            [email]
        );

        res.json(result.rows);
    } catch (error) {
        console.error("Erreur lors de la récupération des indemnisations :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
});

module.exports = router;
