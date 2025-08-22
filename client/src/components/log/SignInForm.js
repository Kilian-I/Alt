import React, { useState } from 'react';

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleLogin} className="sign-in-form">
      <h3>Se connecter</h3>
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
      <input type="submit" value="Valider" />
    </form>
  );
};

export default SignInForm;