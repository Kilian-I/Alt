import React, { useState } from 'react';
import SignInForm from './SignInForm';
import Register from './SignUpForm';

const Log = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const handleForms = (formType) => {
    setIsSignIn(formType === 'signin');
  };

  return (
    <div className="log-container">
      <div className="log-buttons">
        <button
          onClick={() => handleForms('signin')}
          className={isSignIn ? 'active' : ''}
        >
          Se connecter
        </button>
        <button
          onClick={() => handleForms('signup')}
          className={!isSignIn ? 'active' : ''}
        >
          S'inscrire
        </button>
      </div>
      {isSignIn ? <SignInForm /> : <Register />}
    </div>
  );
};

export default Log;