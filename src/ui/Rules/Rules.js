import React from 'react';
import { Text } from 'office-ui-fabric-react';



function Rules() {

  return (
    <div>
      <Text variant={"xLarge"}>Rules</Text>
      <Text variant={"medium"}>
        <p>
          It is not easy to host a pizza meetup online. In order to achieve that we will be using <a href="https://blikmobile.pl/" target="_blank" rel="noopener noreferrer">BLIK</a> codes to authorise all payments.
        </p>
        <p>
          Main reason behind this app and BLIK codes is that <b>we don't want to collect and process ANY personal information</b>. We are not using cookies and we don't track anyone using this app.
          Only data stored in your browser is an unique, random token saved in localStorage
        </p>
        <p>
          It is important that you choose your pizza (or any other food) as soon as the meetup starts. 
          Places like Pyszne.pl or pizzahut allow BLIK payments via PayU. Make sure that the place you make your order from supports BLIK payments!
        </p>
        <p>
          Once the BLIK code appears on your screen there is a <b>2 minutes time limit</b>. 
          If you don't place your order before the time runs out, we will move to the next person.
        </p>
      </Text>
      <Text variant={"large"}>Rest of the rules:</Text>
      <Text variant={"medium"}>
        <ol>
          <li>Everyone in Poland can enter the draw,</li>
          <li>You can enter the draw only once,</li>
          <li>There is a limit of <b>50zł per order</b>,</li>
          <li>If the time runs out you loose your chance for a food delivery,</li>
          <li>Keep this page open so you don't miss out on your chance to win,</li>
          <li>After entring the draw, follow the instructions,</li>
        </ol>
      </Text>

      <Text variant={"medium"}>
      <p>
          Since we are using BLIK it is very hard to verify if what you are ordering is really a pizza or other food.
        </p>
        <p>
          <b>We trust</b> your judgment and believe that this event will be used in good faith :)
        </p>
      </Text>

    </div>
  );
}

export default Rules;
