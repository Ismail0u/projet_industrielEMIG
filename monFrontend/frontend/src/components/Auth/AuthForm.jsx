import React, { useState } from 'react';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      {isSignIn ? <SignIn /> : <SignUp />}
      <button
        onClick={() => setIsSignIn(!isSignIn)}
        className="absolute top-5 right-5 bg-gray-300 text-sm p-2 rounded-lg"
      >
        {isSignIn ? 'Créer un compte' : 'Se connecter'}
      </button>
    </div>
  );
};

export default Auth;
