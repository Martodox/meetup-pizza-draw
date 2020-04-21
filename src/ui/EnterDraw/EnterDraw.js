import React, { useState, Fragment } from 'react';
import './EnterDraw.css';
import { useFirebase } from '../../useFirebase';
import { useLocalStorage } from '../../useLocalStorage';

import { PrimaryButton, TextField } from 'office-ui-fabric-react';


function EnterDraw({onDrawEnter}) {

  const { firebase } = useFirebase();

  const [ nickname, setNickname ] = useState("");

  const db = firebase.firestore();

  const submitNickname = () => {
    db.collection("tokens").add({
      nickname,
      blik: null,
      winner: false
    }).then(document => onDrawEnter(document.id))
  }

  
  return (
    <Fragment>
      <TextField 
        className="TextField"
        label="Nickname" 
        description="Enter your nickname that will be called out during a draw"
        onChange={(_ev, nickname) => {setNickname(nickname)}}
      />

        <PrimaryButton 
          className="Button"
          text="Enter the draw" 
          onClick={submitNickname} 
          disabled={nickname.length === 0} 
        />
    </Fragment>
  );
}

export default EnterDraw;
