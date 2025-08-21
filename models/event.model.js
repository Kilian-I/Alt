const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 255
    },
    description: String,
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        maxlength: 255
    },
    location_type: {
        type: String,
        maxlength: 50
    },
    max_participants: Number,
    is_private: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        required: true,
        maxlength: 20
    },
    
    // Réfrence à l'utilisateur créateur
    creator_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    
    // Réfrence au groupe d'utilisateurs
    group_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserGroup' // Assurez-vous d'avoir un modèle UserGroup
    }
}, {
    timestamps: true // gère created_at et updated_at
});

// Index pour les recherches par date et statut
eventSchema.index({ start_date: 1, end_date: 1 });
eventSchema.index({ status: 1 });

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;