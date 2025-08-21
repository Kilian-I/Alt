const mongoose = require('mongoose');

const friendshipSchema = new mongoose.Schema({
    // creation_date est gérée par `timestamps: true`
    
    user1_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    user2_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true // Gère `created_at` et `updated_at`
});


const Friendship = mongoose.model('Friendship', friendshipSchema);

module.exports = Friendship;