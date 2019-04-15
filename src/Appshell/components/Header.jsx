import React, { Component } from 'react';
import "../styles/Header.scss";
import logo from '../../logo.svg';
import UserDropDown from "./UserDropdown.jsx";

class Header extends Component {

    state = {
        current: 'mail',
    };

    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };

    render() {
        return (
            <nav className="header-container">
                <div className="header-container-title">
                    <a href="/">
                        <img src={logo} alt="logo"/>
                    </a>
                </div>
                <div className="header-container-extra">
                    <span className="header-container-btn"><a href="http://localhost:3000/news">News</a></span>
                    <span className="header-container-btn">About</span>
                    <span className="header-container-btn">
                        <div>
                            <UserDropDown/>
                        </div>
                    </span>
                </div>
            </nav>
        );
    }
}
export default Header;