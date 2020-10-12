import React from 'react';
import './Game.css';
import { useLocalStorage } from '../useLocalStorage';
import DrawInProgress from '../ui/DrawInProgress/DrawInProgress';
import EnterDraw from '../ui/EnterDraw/EnterDraw'
import Rules from '../ui/Rules/Rules';
import Footer from '../ui/Footer/Footer';
import { Text } from 'office-ui-fabric-react';
import Baner from './baner.jpg';

function Game() {

  const [ token, setToken ] = useLocalStorage(`drawToken${new Date().getFullYear()}${new Date().getUTCMonth()}`, "");

  return (
    <div className="App">    
      <Text className="Font_Color" variant={"xxLarge"}>OANDA Pizza draw</Text>
      <div className="Gradient_Bar"/>
      <img className="Banner" src={Baner}/>
      <div className="App_Wrapper">
        {token && <DrawInProgress onReset={() => setToken('')} token={token}/>}
        {!token && <EnterDraw  onDrawEnter={setToken}/>}
      </div>
      <div className="Gradient_Bar"/>
      <div className="App_Wrapper Font_Color">
        <Footer />
      </div>
      <div className="Gradient_Bar"/>
      <div className="App_Wrapper Font_Color">
        <Rules />
      </div>

    </div>
  );
}

export default Game;
