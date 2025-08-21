const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        maxlength: 5000 // Limite de caractères pour le message
    },
    // send_date est gérée par `timestamps: true`
    
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    group_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserGroup',
        required: true
    }
}, {
    timestamps: true // Gère `created_at` et `updated_at` (et donc `send_date`)
});

// Index pour les recherches
messageSchema.index({ user_id: 1 });
messageSchema.index({ group_id: 1 });
messageSchema.index({ createdAt: -1 }); // Pour trier par date d'envoi décroissante

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;