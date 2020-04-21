import React, { useState } from 'react';
import './DrawInProgress.css';

import { useFirebase } from '../../useFirebase';
import { useLocalStorage } from '../../useLocalStorage';

import { useDocument } from 'react-firebase-hooks/firestore';

import { PrimaryButton, Text, TextField, Spinner } from 'office-ui-fabric-react';



function DrawInProgress({token}) {

  const { firebase } = useFirebase();

  const [value, loading, error] = useDocument(
    firebase.firestore().doc(`tokens/${token}`),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  return (
    <div className="Text">
        <Text>Draw in progress</Text>


        <p>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Document: Loading...</span>}
        {value && <span>Document: {JSON.stringify(value.data())}</span>}
      </p>

    </div>
  );
}

export default DrawInProgress;
