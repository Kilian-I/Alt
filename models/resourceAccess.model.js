const mongoose = require('mongoose');

const resourceAccessSchema = new mongoose.Schema({
    access_type: {
        type: String,
        required: true,
        maxlength: 20
    },
    granted_at: {
        type: Date,
        required: true
    },
    expires_at: Date,
    
    resource_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SharedResource',
        required: true
    },
    
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    
    granted_by_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

// Pour la contrainte d'unicité (UC_ResourceAccess_ResourceUser)
resourceAccessSchema.index({ resource_id: 1, user_id: 1 }, { unique: true });

// Index pour les recherches par utilisateur
resourceAccessSchema.index({ user_id: 1 });

const ResourceAccess = mongoose.model('ResourceAccess', resourceAccessSchema);

module.exports = ResourceAccess;