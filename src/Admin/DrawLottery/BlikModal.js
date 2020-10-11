import React from 'react';
import { Text, Spinner, SpinnerSize, IconButton, Modal, DefaultButton } from 'office-ui-fabric-react';
import { Depths } from '@uifabric/fluent-theme/lib/fluent/FluentDepths';
import { useFirebase } from '../../useFirebase';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { WAITING, PROMPT } from '../../drawStages';


function BlikModal({hideModal, currentUser}) {

  const { firebase } = useFirebase();

  const [value, loading] = useDocumentData(
    firebase.firestore().doc(`tokens/${currentUser}`),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const cancelIcon = { iconName: 'Cancel' };

    const PromptUser = () => {

        const promptUser = () => {
            firebase.firestore().doc(`tokens/${currentUser}`).set({
                "hasWon": PROMPT
            }, {merge: true});
            
        }

        return <DefaultButton text="Promtp user" onClick={() => promptUser()} />
    }

  return (
    <Modal
    isOpen={true}
    onDismiss={hideModal}
    isBlocking={false}
  >
    <IconButton
        iconProps={cancelIcon}
        ariaLabel="Close popup modal"
        onClick={hideModal}
      />
      {loading && <Spinner size={SpinnerSize.large} />}
      {!loading && 
        <div>
          {value.nickname}
          
          <PromptUser/>

          
        </div>
        }
  </Modal>
  );
}

export default BlikModal;
