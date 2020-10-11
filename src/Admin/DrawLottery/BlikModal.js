import React from 'react';
import { Text, Spinner, IconButton, Modal } from 'office-ui-fabric-react';
import { Depths } from '@uifabric/fluent-theme/lib/fluent/FluentDepths';
import { useFirebase } from '../../useFirebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { WAITING, PROMPT } from '../../drawStages';


function BlikModal({hideModal, currentUser}) {

  const { firebase } = useFirebase();

  const [value, loading, error] = useCollectionData(
    firebase.firestore().collection(`tokens`).where("hasWon", "in", [PROMPT, WAITING]),
    {
      idField: "id",
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  const cancelIcon = { iconName: 'Cancel' };

  return (
    <Modal
    isOpen={true}
    onDismiss={hideModal}
    isBlocking={false}
  >
    <div>
      <span>Lorem Ipsum</span>
      <IconButton
        iconProps={cancelIcon}
        ariaLabel="Close popup modal"
        onClick={hideModal}
      />
    </div>
    <div>
      <p>
      currentUser: {currentUser}
      </p>
    </div>
  </Modal>
  );
}

export default BlikModal;
