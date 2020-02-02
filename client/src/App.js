import React, { Component } from 'react';
import './App.css';
import Navbar from "./components//layout/NavigationBar";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';



class App extends Component {
  render() {
    return (

      <Router>
        <div className="App">
          <Navbar />
          <Switch>

          </Switch>
        </div>
      </Router>
    
    );
  }
}


export default App;