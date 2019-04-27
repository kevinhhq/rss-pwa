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
    loading: true,
  };

  componentDidMount() {
    this.setState({loading: true, news:[]});
    axios.get(`http://localhost:5000/offline/`).then(
        res => {
          this.setState({news: res.data.slice(0,3), loading: false})
        }
    ).catch(err => {
      console.log(err);
      this.setState({news: [], loading: false});
    });
  }

  renderCard = (category) => {
    if (this.state.loading) {
      return <Skeleton/>
    }
    if (this.state.news.length === 0) {
      return <Empty/>
    }

    return <div className="news-card-list">
      {this.state.news.map((news, index) =>
          <Link key={index} to={{pathname: `/news/${news.id}`, state: {news: news}}}>
            <Card
                key={index}
                hoverable
                bordered={false}
                style={{width: 300}}
                cover={<img src={news.img} alt={"N/A"}/>}
            >

              <Meta
                  title={news.title}
              />
              <div>
                <Icon type="clock-circle"/>{news.time}
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

                    {/*todo: replace with the true data*/}
                    <FollowedItem name="PlaceHolder"/>
                    <FollowedItem name="Foo"/>
                    <FollowedItem name="Bar"/>
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