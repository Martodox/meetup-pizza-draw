import React, { useEffect, useState } from 'react';
import { Text, Spinner, SpinnerSize, IconButton, Modal, DefaultButton, ProgressIndicator } from 'office-ui-fabric-react';
import BlikCode from './BlikCode';
import { useFirebase } from '../../useFirebase';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { WAITING, PROMPT, WON, TIMEOUT } from '../../drawStages';
import "./BlikModal.css";

function BlikModal({ hideModal, currentUser }) {

  const { firebase } = useFirebase();
  const [ shouldStartWaiting, startWaiting ] = useState(false);
  const [value, loading] = useDocumentData(
    firebase.firestore().doc(`tokens/${currentUser}`),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const cancelIcon = { iconName: 'Cancel' };

  const PromptUser = () => {

    const promptUser = async () => {
      await firebase.firestore().doc(`tokens/${currentUser}`).set({
        "hasWon": PROMPT
      }, { merge: true });

      startWaiting(true);

    }

    return <DefaultButton text="Promtp user" onClick={() => promptUser()} />
  }

  const WaitForBlikForm = () => {

    const waitFor = 30000;
    const [percentComplete, setPercentComplete] = useState(0);
    const [now] = useState(Date.now());
    const target = now + waitFor;
    
    

    
    useEffect(() => {
      let intervalId = setInterval(async () => {
        let completed = parseFloat((1 - ((target - Date.now()) / waitFor)).toFixed(2));        
        
        setPercentComplete(completed);

        if (completed > 1) {
          await firebase.firestore().doc(`tokens/${currentUser}`).set({
            "hasWon": WON
          }, { merge: true });
    
          startWaiting(false);
        }

      }, 100);
      return () => {
        clearInterval(intervalId);
      };
    });


    return <ProgressIndicator label="Wait, user is being notified!" percentComplete={percentComplete} />

  }

  return (
    <Modal
    containerClassName={"BlikModal"}
      isOpen={true}
      onDismiss={hideModal}
      isBlocking={false}
    >
      <IconButton
        iconProps={cancelIcon}
        ariaLabel="Close popup modal"
        onClick={hideModal}
      />
      <Text>
        {value && value.nickname}
      </Text>
      {loading && <Spinner size={SpinnerSize.large} />}
      {!loading &&
        <div>
          {value.hasWon === WAITING && <PromptUser />}
          {shouldStartWaiting && <WaitForBlikForm />}
          {[WON, TIMEOUT].includes(value.hasWon) && <BlikCode currentUser={currentUser} hideModal={hideModal}/>}


        </div>
      }
    </Modal>
  );
}

export default BlikModal;
