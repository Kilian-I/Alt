const mongoose = require('mongoose');

const groupMemberSchema = new mongoose.Schema({
    // join_date est gérée par `timestamps: true`
    
    member_status: {
        type: String,
        required: true,
        enum: ['pending', 'active', 'inactive', 'banned'] // Exemples de statuts
    },
    member_role: {
        type: String,
        required: true,
        enum: ['member', 'admin', 'moderator'] // Exemples de rôles
    },
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
    timestamps: true // Gère `created_at` et `updated_at`
});

// Index unique pour garantir qu'un utilisateur n'est membre d'un groupe qu'une seule fois
groupMemberSchema.index({ user_id: 1, group_id: 1 }, { unique: true });

// Index pour les recherches
groupMemberSchema.index({ user_id: 1 });
groupMemberSchema.index({ group_id: 1 });
groupMemberSchema.index({ member_status: 1 });

const GroupMember = mongoose.model('GroupMember', groupMemberSchema);

module.exports = GroupMember;