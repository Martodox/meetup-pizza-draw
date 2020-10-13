import React, {useState} from 'react';
import {DefaultButton, PrimaryButton, TextField} from 'office-ui-fabric-react';
import {useFirebase} from '../../useFirebase';
import {WON, TIMEOUT} from '../../drawStages';
import './BlikCode.css';

function BlikCode({currentUser, hideModal}) {
  const {firebase} = useFirebase();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [blikCode, setBlikCode] = useState('');
  const [submittedAmmount, setSubmittedAmmount] = useState(0);

  const submitBlikCode = async () => {
    await firebase.firestore().doc(`tokens/${currentUser}`).set({
      'hasWon': WON,
      'blik': blikCode,
    }, {merge: true});
    setIsSubmitted(true);
  };

  const setUsedAmmount = async () => {
    await firebase.firestore().doc(`tokens/${currentUser}`).set({
      requestedAmount: submittedAmmount,
    }, {merge: true});
    hideModal();
  };

  const userTimeOut = async () => {
    await firebase.firestore().doc(`tokens/${currentUser}`).set({
      'hasWon': TIMEOUT,
      'blik': '',
    }, {merge: true});
    setIsSubmitted(true);
    hideModal();
  };

  return (
    <div>
      {!isSubmitted &&
                <div>
                  <TextField
                    label="Enter BLIK code"
                    onChange={(_ev, code) => setBlikCode(code)}
                  />
                  <PrimaryButton text="Submit" onClick={submitBlikCode}/>
                </div>
      }

      <DefaultButton text="Timeout" onClick={userTimeOut}/>

      {isSubmitted &&
                <div>
                  <TextField
                    label="Set used ammount. Use dot as decimal separator! eg. 45.33"
                    onChange={(_ev, number) => setSubmittedAmmount(number)}
                  />
                  <PrimaryButton text="Set used ammount" onClick={setUsedAmmount}/>
                </div>
      }
    </div>
  );
}

export default BlikCode;
