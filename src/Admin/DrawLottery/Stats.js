import React from 'react';
import { Text, Spinner, SpinnerSize, Separator } from 'office-ui-fabric-react';
import { useFirebase } from '../../useFirebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { WON } from '../../drawStages';

const sumEntries = (array) => {

  if (!Array.isArray(array)) {
    return 0;
  }

  return array.reduce((acc, val) => acc + Number(val.requestedAmount), 0)
}

function Stats() {
  
  const { firebase } = useFirebase();

  const [value, loading] = useCollectionData(
    firebase.firestore().collection(`tokens`).where("hasWon", "in", [WON]),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  return (
    <div>
      {loading && <Spinner size={SpinnerSize.large} />}
      {!loading && value &&
        <Separator>
          <Text variant="large">
            Total spend: {sumEntries(value).toFixed(2)} PLN
          </Text>
        </Separator>
      }
    </div>
  );
}

export default Stats;
