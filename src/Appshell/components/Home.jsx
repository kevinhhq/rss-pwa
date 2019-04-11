import React, { Component } from 'react';
import '../styles/Home.css';
import Header from './Header.jsx';
import HomeContainer from './HomeContainer.jsx';

class Home extends Component {
    render() {
        return (
            <div>
                <Header/>
                <div className="Home">
                    <HomeContainer/>
                </div>
            </div>
        );
    }
}

export default Home;
