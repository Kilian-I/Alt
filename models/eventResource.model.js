const mongoose = require('mongoose');

const eventResourceSchema = new mongoose.Schema({
    event_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    
    resource_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SharedResource',
        required: true
    }
}, {
    timestamps: true
});

// Pour la contrainte d'unicité (UC_EventResources)
eventResourceSchema.index({ event_id: 1, resource_id: 1 }, { unique: true });

const EventResource = mongoose.model('EventResource', eventResourceSchema);

module.exports = EventResource;