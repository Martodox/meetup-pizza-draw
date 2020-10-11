import React, { useEffect, useState } from 'react';
import './DrawInProgress.css';
import Won from './Won/Won';
import Lost from './Lost/Lost';
import { useFirebase } from '../../useFirebase';
import { WAITING, WON, NOTTHISTIME, PROMPT, TIMEOUT } from '../../drawStages';
import { PING_INTERVAL } from '../../consts';
import { useDocumentData } from 'react-firebase-hooks/firestore';

import { Spinner, PrimaryButton } from 'office-ui-fabric-react';



function DrawInProgress({ token, onReset }) {

  const { firebase } = useFirebase();
  const [pingActive, setPingActive] = useState(false);

  const [value, loading] = useDocumentData(
    firebase.firestore().doc(`tokens/${token}`),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const ping = async () => {
    await firebase.firestore().doc(`tokens/${token}`).set({
      lastUpdated: Date.now(),
    }, { merge: true });
  }

  useEffect(() => {
    let interval;
    if (token && firebase && !pingActive) {       
      interval = setInterval(() => {        
        ping();
      }, PING_INTERVAL);
      setPingActive(true);
     }

     return () => {
       clearInterval(interval);
     }
    
  }, [token])


  return (
    <div className="DrawInProgress">
      {value && value.hasWon === WAITING && <Spinner label={`${value.nickname} please wait for the results`} />}
      {value && [PROMPT, WON, TIMEOUT].includes(value.hasWon) && <Won session={value} />}
      {value && value.hasWon === NOTTHISTIME && <Lost session={value} />}
      {!loading && !value && <PrimaryButton

        text="Reset"
        onClick={onReset}
      />}

    </div>
  );
}

export default DrawInProgress;
