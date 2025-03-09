exports.getPaiements = (req, res) => {
    // Simule une récupération de paiements en base de données
    const paiements = [
        { id: 1, montant: 100, utilisateur: req.user.email },
        { id: 2, montant: 200, utilisateur: req.user.email }
    ];
    res.json({ paiements });
};

exports.createPaiement = (req, res) => {
    const { montant } = req.body;

    if (!montant) {
        return res.status(400).json({ message: "Montant requis" });
    }

    // Simule un ajout de paiement
    const newPaiement = { id: Date.now(), montant, utilisateur: req.user.email };
    
    res.status(201).json({ message: "Paiement créé avec succès", paiement: newPaiement });
};
