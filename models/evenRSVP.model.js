const mongoose = require('mongoose');

const eventRSVPSchema = new mongoose.Schema({
    status: {
        type: String,
        required: true,
        maxlength: 20
    },
    response_date: {
        type: Date,
        required: true
    },
    notes: String,
    
    event_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true // gère created_at et updated_at
});

// Pour la contrainte d'unicité (UC_EventRSVPs_EventUser)
eventRSVPSchema.index({ event_id: 1, user_id: 1 }, { unique: true });

// Index pour les recherches par utilisateur et statut
eventRSVPSchema.index({ user_id: 1, status: 1 });

const EventRSVP = mongoose.model('EventRSVP', eventRSVPSchema);

module.exports = EventRSVP;