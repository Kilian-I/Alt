import React, { useState } from 'react';

const Register = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthdate, setBirthdate] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleRegister} className="sign-up-form">
      <h3>S'inscrire</h3>
      <input
        type="text"
        placeholder="Prénom"
        required
        onChange={(e) => setFirstname(e.target.value)}
        value={firstname}
      />
      <input
        type="text"
        placeholder="Nom"
        required
        onChange={(e) => setLastname(e.target.value)}
        value={lastname}
      />
      <input
        type="email"
        placeholder="Email"
        required
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        required
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <input
        type="date"
        required
        onChange={(e) => setBirthdate(e.target.value)}
        value={birthdate}
      />
      <input type="submit" value="Valider" />
    </form>
  );
};

export default Register;