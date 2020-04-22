import React from 'react';

import { Text, FontIcon, mergeStyles } from 'office-ui-fabric-react';

const iconClass = mergeStyles({
    fontSize: 50,
    height: 50,
    width: 50,
    margin: '25px',
  });


function Lost({session}) {


  
  return (
    <div>
            <Text variant="large">Sorry {session.nickname}!</Text>
            <div><FontIcon iconName="Sad" className={iconClass} /></div>
            <p><Text>We run out of $$ for today</Text></p>


    </div>
  );
}

export default Lost;
