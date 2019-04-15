import React, { Component } from 'react';
import {Avatar, Card} from "antd";
import "../styles/ProfileContainer.scss";
import {decorate} from "mobx";
import {observer} from "mobx-react";
import UserStore from "../../Appshell/stores/UserStore";
import MediaList from "../../Home/components/MediaList";

class ProfileContainer extends Component {

    //todo: replace them to the real news list

    render() {
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
                <div className="profile-section">
                    <h1>My Subscription</h1>
                    <MediaList/>
                </div>
                <div className="profile-section">
                    <h1>History News</h1>
                    <Card>PlaceHolder</Card>
                </div>
            </div>
        );
    }
}

decorate(ProfileContainer, {
    ProfileContainer: observer,
});
export default ProfileContainer;