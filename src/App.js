import React from 'react';
import './App.css';
import './Reset.css'

// Routing
import routes from './utils/routes';
import { withRouter } from 'react-router';

// Components
import Nav from './components/Nav/Nav';
import Sidebar from './components/Sidebar/Sidebar';

// Stylesheets
import './Reset.css';

function App(props) {
  return (
    <div className="App">
      {props.location.pathname === '/' ? <Nav /> : props.location.pathname === '/contact' ? <Nav /> : <Sidebar />}
      {routes}
    </div>
  );
}

export default withRouter(App);
