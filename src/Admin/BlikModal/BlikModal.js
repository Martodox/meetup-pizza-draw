import React, {useState, memo} from 'react';
import {Text, Spinner, SpinnerSize, IconButton, Modal, DefaultButton} from 'office-ui-fabric-react';
import BlikCode from './BlikCode';
import {useFirebase} from '../../useFirebase';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import WaitForBlikForm from './WaitForBlikForm';
import {WAITING, PROMPT, WON, TIMEOUT} from '../../drawStages';
import './BlikModal.css';

function BlikModal({hideModal, currentUser}) {
  const {firebase} = useFirebase();
  const [shouldStartWaiting, startWaiting] = useState(false);
  const [value, loading] = useDocumentData(
      firebase.firestore().doc(`tokens/${currentUser}`),
      {


        snapshotListenOptions: { includeMetadataChanges: true},
      },
  );



  const cancelIcon = {iconName: 'Cancel'};



  const PromptUser = () => {
    const promptUser = async () => {
      await firebase.firestore().doc(`tokens/${currentUser}`).set({
        'hasWon': PROMPT,
      }, {merge: true});

      startWaiting(true);
    };

    return <DefaultButton text="Promtp user" onClick={() => promptUser()} />;
  };

  const triggerHideModal = () =>{
    if (value.hasWon === PROMPT) {
      firebase.firestore().doc(`tokens/${currentUser}`).set({
        'hasWon': WAITING,
      }, {merge: true});
    }

    hideModal();
  };


  return (
    <Modal
      containerClassName={'BlikModal'}
      isOpen={!!currentUser}
      onDismiss={triggerHideModal}
      isBlocking={false}
    >
      <IconButton
        iconProps={cancelIcon}
        ariaLabel="Close popup modal"
        onClick={triggerHideModal}
      />
      <Text>
        {value && value.nickname}
      </Text>
      {loading && <Spinner size={SpinnerSize.large} />}
      {!loading &&
        <div>
          <PromptUser />
          {shouldStartWaiting && <WaitForBlikForm currentUser={currentUser} onWaitingDone={() => startWaiting(false)} />}
          {[WON, TIMEOUT].includes(value.hasWon) && <BlikCode currentUser={currentUser} hideModal={triggerHideModal}/>}


        </div>
      }
    </Modal>
  );
}

export default memo(BlikModal);
