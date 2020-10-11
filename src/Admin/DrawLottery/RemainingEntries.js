import React, { useState, useEffect } from 'react';
import { Text, Spinner, SpinnerSize, List, ActionButton } from 'office-ui-fabric-react';
import { Depths } from '@uifabric/fluent-theme/lib/fluent/FluentDepths';
import { useFirebase } from '../../useFirebase';
import BlikModal from './BlikModal';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { WAITING, PROMPT } from '../../drawStages';
import "./RemainingEntries.css";

const shuffleArray = (sourceArray) => {

  if (!Array.isArray(sourceArray)) {
    return [];
  }

  let array = [...sourceArray];

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i)
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array;
}

function ListElement({user, pickUser}) {
  const icon = { iconName: 'Add' };
  return (
    <div className={"Cell"}>
      <ActionButton iconProps={icon} text={`Choose: ${user.nickname}`} onClick={() => pickUser(user.id)} />
    </div>
  )
}

function RemainingEntries() {

  const { firebase } = useFirebase();
  const [currentUser, setCurrentUser] = useState(null);

  const hideModal = () => {
    setCurrentUser(null);
  }

  const pickUser = (id) => {
    setCurrentUser(id);
  }

  const [value, loading, error] = useCollectionData(
    firebase.firestore().collection(`tokens`).where("hasWon", "in", [PROMPT, WAITING]),
    {
      idField: "id",
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useEffect(() => {
    if (value && Array.isArray(value)) {
      pickUser(value[0].id)
    }
  }, [value, loading])


  return (
    <div>
      {loading && <Spinner size={SpinnerSize.large} />}
      {!!currentUser && <BlikModal hideModal={hideModal} currentUser={currentUser}/>}
      {!loading && value &&
        <div style={{ boxShadow: Depths.depth4 }}>
          <List
            items={shuffleArray(value)}
            onRenderCell={(user) => <ListElement user={user} pickUser={pickUser}/>}
          />
        </div>
      }
    </div>
  );
}

export default RemainingEntries;
