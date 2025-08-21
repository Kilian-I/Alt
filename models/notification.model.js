const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['message', 'friend_request', 'event_invite', 'group_invite', 'comment', 'like', 'share', 'mention', 'system'],
        required: true
    },
    title: {
        type: String,
        required: true,
        maxlength: 255
    },
    content: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    read: {
        type: Boolean,
        default: false
    },
    read_at: Date,
    expires_at: Date,
    action_url: String,
    
    recipient_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    
    sender_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    
    relation_id: mongoose.Schema.Types.ObjectId, // Peut faire référence à un autre ID
    
    metadata: mongoose.Schema.Types.Mixed // Type pour les données JSON
}, {
    timestamps: true
});

// Index pour les recherches
notificationSchema.index({ recipient_id: 1, read: 1, createdAt: -1 });
notificationSchema.index({ type: 1 });

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;