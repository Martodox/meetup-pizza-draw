import React, { useEffect, useState, memo, useCallback } from 'react';
import { ProgressIndicator } from 'office-ui-fabric-react';
import { useFirebase } from '../../useFirebase';
import { WON } from '../../drawStages';
import "./BlikModal.css";


const WaitForBlikForm = ({currentUser, onWaitingDone}) => {
  const { firebase } = useFirebase();

  const waitFor = 10000;
  const [percentComplete, setPercentComplete] = useState(0);
  const [now] = useState(Date.now());
  const target = now + waitFor;
  
  const toggleToWon = useCallback(async () => {
    await firebase.firestore().doc(`tokens/${currentUser}`).set({
      "hasWon": WON
    }, { merge: true });
    onWaitingDone();
  }, [currentUser, onWaitingDone, firebase])

  
  useEffect(() => {
    let intervalId = setInterval(async () => {
      let completed = parseFloat((1 - ((target - Date.now()) / waitFor)).toFixed(2));        
      
      setPercentComplete(completed);

      if (completed > 1) { toggleToWon() }

    }, 100);
    return () => {
      clearInterval(intervalId);
    };
  }, [currentUser, target, toggleToWon]);


  return <ProgressIndicator label="Wait, user is being notified!" percentComplete={percentComplete} />

}

export default memo(WaitForBlikForm)
