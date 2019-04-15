import React, { Component } from 'react';
import { Avatar, Menu, Dropdown, message } from 'antd';
import "../styles/Header.scss";
import {decorate} from "mobx";
import {observer} from "mobx-react";
import UserStore from "../stores/UserStore";
import LoginModal from "./LoginModal";

class UserDropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
        };
    }

    handleModalClose = () => this.setState({ modalVisible: false });
    handleModalOpen = () => this.setState({ modalVisible: true });
    handleModalSubmit = (email, password, signIn=true) => {
        return () => {
            if (signIn) {
                UserStore.signIn(email, password).then(res => {
                    message.success(res);
                    this.setState({ modalVisible: false });
                }).catch(err => {
                    message.error(err.message);
                    this.setState({ modalVisible: true });
                });
            } else {
                UserStore.signUp(email, password).then(res => {
                    message.success(res);
                    this.setState({ modalVisible: false });
                }).catch(err => {
                    message.error(err.message);
                    this.setState({ modalVisible: true });
                });
            }

        }
    };

    signOut = () => {
        return UserStore.signOut().then(res => {
            message.success(res);
        })
    };

    componentDidMount() {
        UserStore.fetchUserState();
    }

    menu = () => {
        return !UserStore.user.email ?
            <Menu>
                <Menu.Item>
                    <div onClick={this.handleModalOpen}>Sign in/up</div>
                </Menu.Item>
            </Menu>
            :
            <Menu>
                <Menu.Item>
                    <a href="/profile/">Profile</a>
                </Menu.Item>
                <Menu.Divider/>
                <Menu.Item>
                    <div onClick={this.signOut}>Sign out</div>
                </Menu.Item>
            </Menu>

    };

    render() {
        return (
            <div>
                <Dropdown overlay={this.menu} trigger={['click']} placement="bottomCenter">
                    <Avatar icon="user" className="header-container-avatar"/>
                </Dropdown>
                <LoginModal
                    visible={this.state.modalVisible}
                    showModal={this.handleModalOpen}
                    submit={this.handleModalSubmit}
                    handleModalClose={this.handleModalClose}
                />
            </div>
        );
    }
}
decorate(UserDropdown, {
    UserDropDown: observer,
});
export default UserDropdown;