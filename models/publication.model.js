const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        maxlength: 5000 // Limite de caractères pour le contenu
    },
    // publication_date est gérée par `timestamps: true`
    
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true // Gère `created_at` et `updated_at` (et donc `publication_date`)
});

// Index pour les recherches par utilisateur et par date
publicationSchema.index({ user_id: 1 });
publicationSchema.index({ createdAt: -1 }); // Pour trier par date de publication décroissante

const Publication = mongoose.model('Publication', publicationSchema);

module.exports = Publication;