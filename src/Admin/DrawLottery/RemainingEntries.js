import React, {useState, useEffect, memo} from 'react';
import {Spinner, SpinnerSize, List, ActionButton, Pivot, PivotItem, PersonaSize, Persona, PersonaPresence} from 'office-ui-fabric-react';
import {Depths} from '@uifabric/fluent-theme/lib/fluent/FluentDepths';
import {useFirebase} from '../../useFirebase';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {WAITING, PROMPT} from '../../drawStages';
import './RemainingEntries.css';
import {TIME_SINCE_AWAY, TIME_SINCE_OFFLINE, PING_INTERVAL} from '../../consts';


const isActive = (timeSince) => {
  if (timeSince > TIME_SINCE_OFFLINE) return PersonaPresence.offline;
  if (timeSince > TIME_SINCE_AWAY) return PersonaPresence.away;

  return PersonaPresence.online;
};

const getStillInGameUsers = (users) => {
  const now = Date.now();

  return [
    ...users.filter((user) => (now - user.lastUpdated) <= TIME_SINCE_AWAY),
    ...users.filter((user) => (now - user.lastUpdated) <= TIME_SINCE_OFFLINE && (now - user.lastUpdated) > TIME_SINCE_AWAY),
    ...users.filter((user) => (now - user.lastUpdated) > TIME_SINCE_OFFLINE),
  ];
};


function ListElement({user, pickUser}) {
  const [, setTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), PING_INTERVAL / 2);
    return () => {
      clearInterval(interval);
    };
  });

  const icon = {iconName: 'MiniExpand'};
  const persona = {
    text: user.nickname,
    secondaryText: user.hasWon === PROMPT ? 'Draw in progress' : `${user.hasWon} - ${user.requestedAmount}`,
    presence: isActive(Date.now() - user.lastUpdated),
    size: PersonaSize.size40,
    coinSize: 40,
  };
  return (
    <div className={'Cell'}>

      <Persona {...persona} size={PersonaSize.size40} />

      <ActionButton iconProps={icon} text={`Open modal`} onClick={() => pickUser(user.id)} />
    </div>
  );
}

function RemainingEntries({setCurrentUser}) {
  const {firebase} = useFirebase();


  const pickUser = (id) => {
    setCurrentUser(id);
  };

  const [value, loading] = useCollectionData(
      firebase.firestore().collection(`tokens`),
      {
        idField: 'id',
        snapshotListenOptions: {includeMetadataChanges: true},
      },
  );


  return (
    <div>
      {loading && <Spinner size={SpinnerSize.large} />}
      {!loading && value &&
        <div style={{boxShadow: Depths.depth4}}>
          <Pivot aria-label="Basic Pivot Example">
            <PivotItem headerText="Still in game">
              <List
                items={getStillInGameUsers(value.filter((val) => [WAITING, PROMPT].includes(val.hasWon)))}
                onRenderCell={(user) => <ListElement user={user} pickUser={pickUser} />}
              />
            </PivotItem>
            <PivotItem headerText="Archive">
              <List
                items={value.filter((val) => ![WAITING, PROMPT].includes(val.hasWon))}
                onRenderCell={(user) => <ListElement user={user} pickUser={pickUser} />}
              />
            </PivotItem>
          </Pivot>

        </div>
      }
    </div>
  );
}

export default memo(RemainingEntries);
