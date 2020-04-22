import React, { useState, Fragment } from 'react';
import './EnterDraw.css';
import { useFirebase } from '../../useFirebase';
import { WAITING } from '../../drawStages';
import { PrimaryButton, TextField, Checkbox, Text } from 'office-ui-fabric-react';


function EnterDraw({onDrawEnter}) {

  const { firebase } = useFirebase();

  const [ nickname, setNickname ] = useState("");
  const [ readTheRules, setReadTheRules ] = useState(false);

  const db = firebase.firestore();

  const submitNickname = () => {
    db.collection("tokens").add({
      nickname,
      blik: "",
      hasWon: WAITING
    }).then(document => onDrawEnter(document.id))
  }

  
  return (
    <Fragment>
      <Text variant={"xLarge"}>Enter the draw</Text>
      <TextField 
        className="TextField"
        label="Nickname" 
        description="Enter your nickname that will be called out during a draw"
        onChange={(_ev, nickname) => setNickname(nickname)}
      />

      <Checkbox 
        className="Checkbox"
        label="I understand the rules" 
        onChange={(_ev, checked) => setReadTheRules(checked)} 
      />

      <PrimaryButton 
        className="Button"
        text="Enter the draw" 
        onClick={submitNickname} 
        disabled={nickname.length === 0 || !readTheRules} 
      />
    </Fragment>
  );
}

export default EnterDraw;
