import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import HomeContainer from "./Appshell/components/HomeContainer";
import Header from './Appshell/components/Header.jsx';
import 'antd/dist/antd.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Router>
          <Switch>
            <Route path="/" component={HomeContainer}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
