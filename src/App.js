import React from 'react';
import './App.css';
import Contact from './components/Contact/Contact'
import './Reset.css'

// Components
import Nav from './components/Nav/Nav';

// Stylesheets
import './Reset.css';

function App() {
  return (
    <div className="App">
      <Nav />
      <Contact/>
    </div>
  );
}

export default App;
