import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import HomeContainer from "./Appshell/components/HomeContainer";
import Header from './Appshell/components/Header.jsx';
import NewsDetail from './NewsDetail/components/NewsDetail';
import ListView from './ListView/components/ListView';
import 'antd/dist/antd.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Router>
          <Switch>
            <Route exact path="/" component={HomeContainer}/>
            <Route exact path="/detail" component={NewsDetail}/>
            <Route exact path="/list" component={ListView}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
