import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Game from './screens/Game';
import { RecoilRoot } from 'recoil';
import socket from './socket/MainSocket';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Join from './screens/Join';

function App() {

  const [globalSocket, setGlobalSocket] = useState(null);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('socket id: ' + socket.id);
      setGlobalSocket(socket);
    });

    return () => {
      setGlobalSocket(null);
      socket.disconnect();
    }

  }, []);



  return (
    <RecoilRoot>
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route path="/" exact>
              {globalSocket && <Join socket={globalSocket} />}
            </Route>
            <Route path="/game/:roomId">
              <Game socket={globalSocket} />
            </Route>
          </Switch>
        </div>
      </Router>

    </RecoilRoot>
  );
}

export default App;
