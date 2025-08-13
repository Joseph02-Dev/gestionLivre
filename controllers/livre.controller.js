const Livre = require('../models/livres.model');

// ✅ Créer un livre (lié à l'utilisateur connecté)
exports.creationNouveauLivre = async (req, res) => {
  try {
    const { titre, auteur, resume } = req.body;

    if (!titre || !auteur) {
      return res.status(400).json({ message: 'Titre et auteur obligatoires' });
    }

    const nouveauLivre = new Livre({
      titre,
      auteur,
      resume,
      utilisateur: req.user.id // 👈 ID de l'utilisateur connecté
    });

    await nouveauLivre.save();

    res.status(201).json(nouveauLivre);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// ✅ Lire uniquement les livres de l'utilisateur connecté
exports.voirLivre = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // On retire la restriction par utilisateur
    const totalLivre = await Livre.countDocuments();
    const livres = await Livre.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.json({
      page,
      limit,
      totalLivre,
      totalPages: Math.ceil(totalLivre / limit),
      livres
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// ✅ Mettre à jour un livre (uniquement si c'est le sien)
exports.mettreAJourLivre = async (req, res) => {
  try {
    const { id } = req.params;
    const { titre, auteur, resume } = req.body;

    const livre = await Livre.findOne({ _id: id, utilisateur: req.user.id });
    if (!livre) {
      return res.status(404).json({ message: 'Livre non trouvé ou non autorisé' });
    }

    livre.titre = titre || livre.titre;
    livre.auteur = auteur || livre.auteur;
    livre.resume = resume || livre.resume;

    await livre.save();
    res.json(livre);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// ✅ Supprimer un livre (uniquement si c'est le sien)
exports.supprimerLivre = async (req, res) => {
  try {
    const { id } = req.params;

    const livre = await Livre.findOneAndDelete({ _id: id, utilisateur: req.user.id });
    if (!livre) {
      return res.status(404).json({ message: 'Livre non trouvé ou non autorisé' });
    }

    res.json({ message: 'Livre supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};
