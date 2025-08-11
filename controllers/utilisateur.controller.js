const utilisateur = require('../models/utilisateur.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.inscription = async (req, res) => {
  try {
    const { nom, email, motDePasse } = req.body;

    // Validation basique
    if (!nom || !email || !motDePasse) {
      return res.status(400).json({ message: 'Tous les champs sont obligatoires' });
    }

    // Vérifier si l'email existe déjà
    const existanceUlisateur = await utilisateur.findOne({ email });
    if (existanceUlisateur) {
      return res.status(400).json({ message: 'Email déjà utilisé' });
    }

    // Hash du mot de passe
    const cryptageMotDePasse = await bcrypt.hash(motDePasse, 10);

    // Création de l'utilisateur
    const nouvelUtilisateur = new utilisateur({
      nom,
      email,
      motDePasse: cryptageMotDePasse
    });

    await nouvelUtilisateur.save();
    res.status(201).json({ message: 'Utilisateur créé avec succès' });

  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

exports.connexion = async (req, res) => {
  try {
    const { email, motDePasse } = req.body;

    // Validation
    if (!email || !motDePasse) {
      return res.status(400).json({ message: 'Tous les champs sont obligatoires' });
    }

    // Vérifier si l'utilisateur existe
    const utilisat = await utilisateur.findOne({ email });
    if (!utilisat) {
      return res.status(400).json({ message: 'Utilisateur non trouvé' });
    }

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(motDePasse, utilisat.motDePasse);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mot de passe incorrect' });
    }

    // Générer le token
    const token = jwt.sign(
      { id: utilisat._id, email: utilisat.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      message: 'Connexion réussie',
      token
    });

  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

