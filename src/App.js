import React, { useEffect, useState } from 'react';
import './App.css';
import { RecoilRoot } from 'recoil';
import socket from './socket/MainSocket';
import Join from './screens/Join';
import Call from './screens/Call';
import Login from './screens/Login';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

function App() {

  const [allUsers, setAllUser] = useState({});


  //manage a global socket
  useEffect(() => {

    socket.on('connect', () => {
      console.log('socket id: ', socket.id);
    })


    return () => {
      socket.disconnect();
    }

  }, []);


  return (
    <RecoilRoot>
      <Router>
        <div className="App">
          <switch>
            <Route path="/" exact>
              <Login />
            </Route>
            <Route path="/join/:username" exact>
              <Join socket={socket} />
            </Route>
            <Route path="/game/:id">
              <Call socket={socket} />
            </Route>
          </switch>
        </div>
      </Router>

    </RecoilRoot>
  );
}

export default App;
