import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import HomeContainer from "./Appshell/components/HomeContainer";
import Header from './Appshell/components/Header.jsx';
import NewsDetail from './News/components/NewsDetail';
import ListView from './News/components/ListView';
import ProfileContainer from './User/components/ProfileContainer';
import 'antd/dist/antd.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Router>
          <Switch>
            <Route exact path="/" component={HomeContainer}/>
            <Route exact path="/news/:id" component={NewsDetail}/>
            <Route exact path="/news" component={ListView}/>
            <Route path="/profile/" component={ProfileContainer}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
