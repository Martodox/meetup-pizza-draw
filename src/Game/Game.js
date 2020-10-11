import React from 'react';
import './Game.css';
import { useLocalStorage } from '../useLocalStorage';
import DrawInProgress from '../ui/DrawInProgress/DrawInProgress';
import EnterDraw from '../ui/EnterDraw/EnterDraw'
import Rules from '../ui/Rules/Rules';
import Footer from '../ui/Footer/Footer';
import { Text } from 'office-ui-fabric-react';
import { Depths } from '@uifabric/fluent-theme/lib/fluent/FluentDepths';




function Game() {


  const [ token, setToken ] = useLocalStorage("drawToken", "");

  
  return (
    <div className="App">
      <Text variant={"xxLarge"}>Meetjs Pizza draw</Text>
      <div className="App_Wrapper" style={{ boxShadow: Depths.depth4 }}>
        {token && <DrawInProgress onReset={() => setToken('')} token={token}/>}
        {!token && <EnterDraw  onDrawEnter={setToken}/>}
      </div>

      <div className="App_Wrapper" style={{ boxShadow: Depths.depth4 }}>
        <Footer />
      </div>

      <div className="App_Wrapper" style={{ boxShadow: Depths.depth4 }}>
        <Rules />
      </div>



    </div>
  );
}

export default Game;
