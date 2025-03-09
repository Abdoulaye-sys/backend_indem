const express = require("express");
const pool = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Récupérer les paiements de l'utilisateur connecté
router.get("/", authMiddleware, async (req, res) => {
    try {
        const { email } = req.user;

        const result = await pool.query(
            "SELECT * FROM paiements WHERE user_email = $1 ORDER BY date DESC",
            [email]
        );

        res.json(result.rows);
    } catch (error) {
        console.error("Erreur lors de la récupération des paiements :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
});

// ✅ Générer un nouveau paiement (Simulation)
router.post("/generate", authMiddleware, async (req, res) => {
    try {
        const { email } = req.user;

        // Récupérer les indemnités de l'utilisateur
        const indemnResult = await pool.query(
            "SELECT montant FROM indemnisations WHERE user_email = $1",
            [email]
        );

        if (indemnResult.rows.length === 0) {
            return res.status(404).json({ message: "Aucune indemnisation trouvée" });
        }

        const montant = indemnResult.rows[0].montant; // Montant de l'indemnisation

        // Insérer un nouveau paiement en base
        const newPaiement = await pool.query(
            "INSERT INTO paiements (user_email, montant, statut, date) VALUES ($1, $2, $3, NOW()) RETURNING *",
            [email, montant, "En attente"]
        );

        res.status(201).json(newPaiement.rows[0]);
    } catch (error) {
        console.error("Erreur lors de la génération du paiement :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
});

module.exports = router;
