import React from 'react';
import './Footer.css';
import { Text } from 'office-ui-fabric-react';
import logo from './logo.png'



function Footer() {

  return (
    <div>
      <Text variant="large" className="Sponsor">
        Food brought to you by:  <img alt="logo" className="Logo" src={logo}></img>
      </Text>
      
    </div>
  );
}

export default Footer;
