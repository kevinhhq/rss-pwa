import React, { Component } from 'react';
import {Avatar, Card, Divider, Spin} from "antd";
import "../styles/ProfileContainer.scss";
import {decorate} from "mobx";
import {observer} from "mobx-react";
import UserStore from "../../Appshell/stores/UserStore";
import SiteList from "../../Home/components/SiteList";

class ProfileContainer extends Component {

    //todo: replace them to the real news list

    render() {
        if (UserStore.state.loading) {
            return (
                <div className="profile-container">
                    <div className="profile-avatar">
                       <Spin/>
                    </div>
                </div>
            );
        }

        if (!UserStore.user.email) {
            return (
                <div className="profile-container">
                    <div className="profile-avatar">
                        <h1>You have to Sign in</h1>
                    </div>
                </div>
            );
        }
        return(
            <div className="profile-container">
                <div className="profile-avatar">
                    <Avatar size={100} icon="user" src={UserStore.user.photoURL ? UserStore.user.photoURL : ""}/>
                    <h1>Welcome, {UserStore.user.displayName || UserStore.user.email}</h1>
                    <br/>
                </div>
                <section className="profile-section">
                    <h1>My Subscription</h1>
                    <SiteList/>
                </section>
                <Divider/>
                <section className="profile-section">
                    <h1>Browsed News</h1>
                    <Card>PlaceHolder</Card>
                </section>
                <Divider/>
            </div>
        );
    }
}

decorate(ProfileContainer, {
    ProfileContainer: observer,
});
export default ProfileContainer;