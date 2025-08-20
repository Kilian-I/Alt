const mongoose = require('mongoose');
const validator = require('validator');
const isEmail = validator.isEmail;
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: [isEmail],
    unique: true, // L'email doit être unique pour chaque utilisateur
  },
  password: {
    type: String,
    required: true,
  },
  birthdate: {
    type: Date,
    required: false, // J'ai supposé que la date de naissance n'est pas toujours obligatoire
  },
  avatar: {
    type: String,
    required: false, // L'avatar est probablement facultatif
  },
  bio: {
    type: String,
    required: false, // La bio est probablement facultative
  },
},
  {timestamps: true} // Ajoute les champs createdAt et updatedAt
);

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    (next)
});

const User = mongoose.model('User', userSchema);

module.exports = User;
/*
const filteredPaths = Object.keys(utilisateurSchema.paths).filter(path => !path.startsWith('_'));
console.log('User Schema Paths (Filtered):', filteredPaths);
*/