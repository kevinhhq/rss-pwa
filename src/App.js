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
                  <Route exact path="/" component={Home}/>
                  <Route exact path="/pokemons/" />
                  <Route path="/pokemons/:id" />
                  <Redirect from="/" to="/pokemons/"/>
              </Switch>
          </Router>
      </div>
    );
  }
}

export default App;
