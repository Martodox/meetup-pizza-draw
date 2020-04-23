import React from 'react';
import './DrawInProgress.css';
import Won from './Won/Won';
import Lost from './Lost/Lost';
import { useFirebase } from '../../useFirebase';
import { WAITING, WON, NOTTHISTIME } from '../../drawStages';

import { useDocumentData } from 'react-firebase-hooks/firestore';

import { Spinner, PrimaryButton } from 'office-ui-fabric-react';



function DrawInProgress({token, onReset}) {

  const { firebase } = useFirebase();

  const [value, loading] = useDocumentData(
    firebase.firestore().doc(`tokens/${token}`),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  return (
    <div className="DrawInProgress">
      {value && value.hasWon === WAITING && <Spinner label={`${value.nickname} please wait for the results`} />}
      {value && value.hasWon === WON && <Won session={value} /> }
      {value && value.hasWon === NOTTHISTIME && <Lost session={value}/> }
      {!loading && !value && <PrimaryButton 
        
        text="Reset" 
        onClick={onReset} 
      />}

    </div>
  );
}

export default DrawInProgress;
