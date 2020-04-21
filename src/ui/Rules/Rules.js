import React, { useState } from 'react';
import './App.css';
import { useLocalStorage } from './useLocalStorage';
import DrawInProgress from './ui/DrawInProgress/DrawInProgress';
import EnterDraw from './ui/EnterDraw/EnterDraw'
import { Text } from 'office-ui-fabric-react';



function App() {


  const [ token, setToken ] = useLocalStorage("drawToken", "");

  
  return (
    <div className="App">

      <Text variant={"xxLarge"}>Meetjs Pizza draw</Text>

      {token && <DrawInProgress token={token}/>}
      {!token && <EnterDraw  onDrawEnter={setToken}/>}

    </div>
  );
}

export default App;
