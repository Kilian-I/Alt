const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        maxlength: 2000 // Limite de caractères pour le contenu du commentaire
    },
    // comment_date est gérée par `timestamps: true`
    
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    publication_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Publication',
        required: true
    }
}, {
    timestamps: true // Gère `created_at` et `updated_at` (et donc `comment_date`)
});

// Index pour les recherches par utilisateur, publication et date
commentSchema.index({ user_id: 1 });
commentSchema.index({ publication_id: 1 });
commentSchema.index({ createdAt: -1 }); // Pour trier par date de commentaire décroissante

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;