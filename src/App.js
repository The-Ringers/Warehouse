import React from 'react';
import './App.css';
import './Reset.css'

// Routing
import routes from './utils/routes';
import { withRouter } from 'react-router';

// Redux
import { connect } from 'react-redux';

// Components
import Nav from './components/Nav/Nav';
import Sidebar from './components/Sidebar/Sidebar';

// Stylesheets
import './Reset.css';

function App(props) {
  return (
    <div className="App">
      {
        props.location.pathname === '/' 
        ? 
        <Nav /> 
        : 
        props.location.pathname === '/contact' 
        ? 
        <Nav /> 
        : 
        props.location.pathname === `/${props.company.name}/dashboard`
        ?
        <Nav />
        :
        <Sidebar />
      }
      {routes}
    </div>
  );
}

const mapStateToProps = (state) => {
  return state
}

export default withRouter(connect(mapStateToProps)(App));
