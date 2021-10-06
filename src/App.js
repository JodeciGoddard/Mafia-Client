import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Game from './screens/Game';
import { RecoilRoot } from 'recoil';
import mainSocket from './socket/MainSocket';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Join from './screens/Join';

function App() {


  //manage a global socket
  useEffect(() => {
    mainSocket.on('connect', () => {
      console.log('socket id: ' + mainSocket.id);

    });


    return () => {
      mainSocket.disconnect();
    }

  }, []);


  return (
    <RecoilRoot>
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route path="/" exact>
              <Join socket={mainSocket} />
            </Route>
            <Route path="/game/:roomId">
              <Game socket={mainSocket} />
            </Route>
          </Switch>
        </div>
      </Router>

    </RecoilRoot>
  );
}

export default App;
