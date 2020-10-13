import React from 'react';
import Prompt from '../Prompt/Prompt';
import {PROMPT, TIMEOUT} from '../../../drawStages';

import {Text, FontIcon, mergeStyles, Spinner, SpinnerSize} from 'office-ui-fabric-react';

const iconClass = mergeStyles({
  fontSize: 50,
  height: 50,
  width: 50,
  margin: '25px',
});


function Won({session}) {
  return (
    <div>
      {session.hasWon === PROMPT && <Prompt />}
      <Text variant="large">Congratulations {session.nickname}!</Text>


      {session.hasWon !== TIMEOUT &&
        <>
          <div><FontIcon iconName="HeartFill" className={iconClass} /></div>
          <p><Text>Make sure you are on a payment page and wait for BLIK code to appear!</Text></p>
          <p><Text>Once it does enter it and wait for authorisation.</Text></p>
          <Text>Your BLIK code:</Text>
          {!session.blik && <Spinner size={SpinnerSize.large} />}
          {session.blik && <Text variant="xxLarge"> {session.blik}</Text>}
        </>
      }

      {session.hasWon === TIMEOUT &&
        <div>
          <FontIcon iconName="sad" className={iconClass} />
          <Text>Your two minutes are up</Text>
        </div>
      }


    </div>
  );
}

export default Won;
