import React, { Component } from 'react';
import { Avatar, Menu, Dropdown } from 'antd';
import "../styles/Header.scss";

class UserDropdown extends Component {

    menu = () => {
        return <Menu>
            <Menu.Item>
                <a href="/">Sign in</a>
            </Menu.Item>
            <Menu.Divider/>
            <Menu.Item>
                <a href="/">Sign up</a>
            </Menu.Item>
            <Menu.Divider/>
            <Menu.Item>
                <a href="/">Settings</a>
            </Menu.Item>
            <Menu.Divider/>
            <Menu.Item>
                <a href="/">Sign out</a>
            </Menu.Item>

        </Menu>
    };

    render() {
        return (
            <Dropdown overlay={this.menu} trigger={['click']} placement="bottomCenter">
                <Avatar icon="user" className="header-container-avatar"/>
            </Dropdown>
        );
    }
}

export default UserDropdown;