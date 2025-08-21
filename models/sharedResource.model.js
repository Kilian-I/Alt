const mongoose = require('mongoose');

const sharedResourceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 255
    },
    description: String,
    resource_type: {
        type: String,
        required: true,
        maxlength: 50
    },
    path: {
        type: String,
        required: true
    },
    mime_type: {
        type: String,
        required: true,
        maxlength: 100
    },
    size: {
        type: Number,
        required: true
    },
    is_public: {
        type: Boolean,
        default: false
    },
    creator_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    
    // Référence récursive (self-reference) pour la hiérarchie de ressources
    parent_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SharedResource'
    },
    
    metadata: mongoose.Schema.Types.Mixed // Type pour les données JSON
}, {
    timestamps: true
});

// Index pour les recherches par type de ressource et par créateur
sharedResourceSchema.index({ resource_type: 1 });
sharedResourceSchema.index({ creator_id: 1 });

const SharedResource = mongoose.model('SharedResource', sharedResourceSchema);

module.exports = SharedResource;