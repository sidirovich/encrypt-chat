import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';

import { useStore } from 'effector-react'
import {
  Username,
  roomName,
  Uid,
  Salt,
  RSA,
  PublicKey,
} from './mvvm/Model/stateEffector';

import { ChatInterface } from './tsx/Chat';
import { Settings } from './tsx/Settings';
import { Guides } from './tsx/Guides';

export default function App() {
  const user = useStore(Username);
  const room = useStore(roomName);
  const uid = useStore(Uid);
  const salt = useStore(Salt);
  const rsa = useStore(RSA);
  const publicKey = useStore(PublicKey);

  /*
    const [toasts, setToasts] = useState(null);
    const setStateToasts = () => { }
    let timerId = setInterval(() => clearToasts(), 3000)
    const clearToasts = () => { }
  */

  return (
    <Router>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-6 mt-5 t-c">
            <div className="row">
              <div className="col-12 mb-3">
                <p className="t-c">Typescript Encrypt Chat <small>v0.0.1</small></p>
              </div>
              <div className="col-4">
                <Link to="/">Home</Link>
              </div>
              <div className="col-4">
                <Link to="/Settings">Settings</Link>
              </div>
              <div className="col-4">
                <Link to="/Guides">Guides</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-6 mt-2">
            <Switch>
              <Route exact path="/">
                <ChatInterface
                  user={ user }
                  room={ room }
                  uid={ uid }
                  salt={ salt }
                  rsa={ rsa }
                  publicKey={ publicKey }
                />
              </Route>
              <Route path="/settings">
                <Settings 
                  user={ user }
                  room={ room }
                  uid={ uid }
                  salt={ salt }
                />
              </Route>
              <Route path="/guides">
                <Guides />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
      {
        /*
          <div className="container-fluid">
            <div className="toast-container position-absolute top-0 end-0 p-3">
              <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-header">
                  <strong className="me-auto">Error</strong>
                  <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div className="toast-body">
                  <p style={{ color: '#182231' }}>See? Just like this.</p>
                </div>
              </div>
              <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-header">
                  <strong className="me-auto">Error</strong>
                  <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div className="toast-body">
                  <p style={{ color: '#182231' }}>See? Just like this.</p>
                </div>
              </div>
            </div>
          </div>
        */
      }
    </Router>
    
  );
}
