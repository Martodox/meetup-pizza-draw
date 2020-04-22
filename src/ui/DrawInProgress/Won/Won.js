import React from 'react';



import { Text, FontIcon, mergeStyles, Spinner, SpinnerSize } from 'office-ui-fabric-react';

const iconClass = mergeStyles({
    fontSize: 50,
    height: 50,
    width: 50,
    margin: '25px',
  });


function Won({session}) {


  
  return (
    <div>
            <Text variant="large">Congratulations {session.nickname}!</Text>
            <div><FontIcon iconName="HeartFill" className={iconClass} /></div>
            <p><Text>Make sure you are on a payment page and wait for BLIK code to appear!</Text></p>
            <p><Text>Once it does enter it and wait for authorisation.</Text></p>

            Your BLIK code: 
            {!session.blik && <Spinner size={SpinnerSize.large} />}
            {session.blik && <Text variant="xxLarge"> {session.blik}</Text>}

    </div>
  );
}

export default Won;
