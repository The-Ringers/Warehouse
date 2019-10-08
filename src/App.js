import React from 'react';
import './App.css';

// Routing
import routes from './utils/routes';

// Components
import Nav from './components/Nav/Nav';

// Stylesheets
import './Reset.css';

function App() {
  return (
    <div className="App">
      <Nav />
      {routes}
    </div>
  );
}

export default App;
