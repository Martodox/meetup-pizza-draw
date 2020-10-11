import React from 'react';
import { ActionButton } from 'office-ui-fabric-react';
import { useFirebase } from '../useFirebase';

const { api } = useFirebase();




function Login() {

  const login = () => {
    const googleAuthProvider = new api.auth.GoogleAuthProvider();
    api.auth().signInWithPopup(googleAuthProvider);
  }

  const icon = { iconName: 'LockSolid' };


  return (
    <ActionButton iconProps={icon} onClick={login}>
      Log In with Google
    </ActionButton>
  );
}

export default Login;
