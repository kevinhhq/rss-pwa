import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import './App.css';
import Home from './Appshell/components/Home'
import 'antd/dist/antd.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Router>
              <Switch>
                  <Route path="/rss-pwa/" component={Home}/>
                  <Redirect from="/" to="/rss-pwa/" />
              </Switch>
          </Router>
      </div>
    );
  }
}

export default App;
