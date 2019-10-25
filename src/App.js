import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar  } from 'react-bootstrap';
import Routes from './Routes';
import './App.css';

function App() {
  return (
    <div className="App container">
      <div className="App container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Resizer</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
        </Navbar>
        <Routes />
      </div>
    </div>
  );
}

export default App;
