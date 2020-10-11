import React from 'react';
import './Footer.css';
import { Text } from 'office-ui-fabric-react';


function Footer() {

  return (
    <div>
      <Text className="Sponsor">
        Hi there! It’s <a href="https://www.oanda.com/group/culture/job-openings/" target="_blank" rel="noopener noreferrer">Oanda Poland.</a> We’re new in town, but we’ve been operating in the fintech industry for 23 years globally. 
        We target Kraków to be our second largest office. Let’s build this great thing together!
      </Text>
    </div>
  );
}

export default Footer;
