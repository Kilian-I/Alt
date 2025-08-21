const mongoose = require('mongoose');

const userGroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 100,
        trim: true
    },
    description: {
        type: String,
        maxlength: 1000
    },
    // creation_date est gérée par `timestamps: true`
    
    creator_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
        // ON DELETE RESTRICT est géré manuellement dans la logique de l'application
        // car Mongoose ne supporte pas directement RESTRICT pour les références.
        // Vous devrez vérifier si un groupe a des membres avant de supprimer un utilisateur.
    }
}, {
    timestamps: true // Gère `created_at` et `updated_at`
});

const UserGroup = mongoose.model('UserGroup', userGroupSchema);

module.exports = UserGroup;