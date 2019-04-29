import React, { Component } from 'react';
import {Avatar, Card, Divider, Empty, Icon, Skeleton, Spin} from "antd";
import "../styles/ProfileContainer.scss";
import '../../Home/styles/NewsList.scss';
import {decorate} from "mobx";
import {observer} from "mobx-react";
import UserStore from "../../Appshell/stores/UserStore";
import FollowedItem from "./FollowedItem.jsx";
import {Link} from "react-router-dom";
import axios from "axios";

const { Meta } = Card;

class ProfileContainer extends Component {

    //todo: replace them to the real news list
  state = {
    news: [],
    channels: {},
    loading: true,
  };

  componentDidMount() {
    this.setState({loading: true, news:[], channels: []});
    axios.get(`http://localhost:3000/api/offline/`).then(
        res => {
          this.setState({news: res.data.slice(0,3), loading: false})
        }
    ).catch(err => {
      this.setState({news: [], loading: false});
    });
  }

  renderCard = () => {
    if (UserStore.state.loading) {
      return <Skeleton/>
    }
    if (this.state.news.length === 0) {
      return <Empty/>
    }

    const readNews = UserStore.user.readNews;
    return <div className="news-card-list">
      {Object.keys(UserStore.user.readNews).map((id, index) =>
          <Link key={index} to={{pathname: `/news/${id}`, state: {news: readNews[id]}}}>
            <Card
                key={index}
                hoverable
                bordered={false}
                style={{width: 300}}
                cover={<img src={readNews[id].img_url} alt={"N/A"}/>}
            >

              <Meta
                  title={readNews[id].summary}
              />
              <div>
                <Icon type="clock-circle"/>{readNews[id].timestamp}
              </div>
            </Card>
          </Link>)}
    </div>;
  };

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
                <div className="subcriptions">
                  {UserStore.user.channels ? Object.keys(UserStore.user.channels).map((chan, index) =>
                      <FollowedItem name={chan} type={UserStore.user.channels[chan].type} key={index}/>) :
                      <div style={{margin: "0 auto"}}>
                        <Empty/>
                      </div>
                  }
                </div>
              </section>
              <Divider/>
              <section className="profile-section">
                  <h1>Browsed News</h1>
                  {this.renderCard()}
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