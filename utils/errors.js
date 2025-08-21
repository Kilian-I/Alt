module.exports.signUpErrors = (err) => {
    let errors = { lastname: '', firstname: '', email: '', password: '', birthdate: '', avatar: '', bio: '' };
    if (err.message.includes('lastname')) {
        errors.lastname = 'Lastname Incorrect';
    }
    if (err.message.includes('firstname')) {
        errors.firstname = 'Firstname Incorrect';
    }
    if (err.message.includes('email')) {
        errors.email = 'Email Incorrect ou deja pris';
    }
    if (err.message.includes('password')) {
        errors.password = 'Password Incorrect';
    }
    if (err.message.includes('birthdate')) {
        errors.birthdate = 'Birthdate Incorrect';
    }
    if (err.message.includes('avatar')) {
        errors.avatar = 'Avatar Incorrect';
    }
    if (err.message.includes('bio')) {
        errors.bio = 'Bio Incorrect';
    }
    if (err.code === 11000 && Object.keys(err.keyValue)[0] === 'email') {
        errors.email = 'Email existe déjà';
    }
    return errors;
}

module.exports.SignInErrors = (err) => {
    let errors = { email: '', password: '' };
    if (err.message.includes('email')) {
        errors.email = 'Email Inconnu';
    }
    if (err.message.includes('password')) {
        errors.password = 'Password Incorrect';
    }

    return errors;
}