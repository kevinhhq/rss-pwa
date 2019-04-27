import React, { Component } from 'react';
import '../styles/NewsDetail.scss';
import { Button, Empty, Tag, Breadcrumb, Icon, Divider, Avatar, message} from 'antd';
import news_list from "../../mock/news_list"
import { Link } from 'react-router-dom'
import moment from 'moment';
import {decorate} from "mobx";
import {observer} from "mobx-react";
import UserStore from "../../Appshell/stores/UserStore";
import axios from 'axios';


class NewsDetail extends Component {
  constructor(){
    super();
    this.state = {
      currentNews: {},
      following: false,
      visible: false
    }
  }

  componentDidMount() {
    // need to get news by id

    this.setState({currentNews: news_list[1]});
    // set subscribed
  }

  handleFollow = () => {
    axios.put(`http://localhost:3000/api/user/${UserStore.user.uid}`,
        {channel: this.state.currentNews.source.toLowerCase()}).then(res => {
      this.setState({following: !this.state.following});
    }).catch(err =>
        message.error(err)
    );
  };

  renderBody = (body) => {
    body = body.replace(new RegExp(/\r\n/g,'g'), '<br />');
    return body.split('\n').map((item, index) =>
        <span key={index}>
          {item}
          <br/>
        </span>
    )
  };

  render() {
    const {currentNews} = this.state;
    const value = this.state.following ? "Unfollow" : "Follow";
    const theme = this.state.following ? "filled" : "";


    if (Object.keys(currentNews).length === 0) {
      return <div className="detail-container">
          <Empty/>
      </div>
    }

    return (
      <div className="detail-container">
        <div className="breadcrumb">
          <Breadcrumb>
            <Breadcrumb.Item><Link to="/"><Icon type="home"/> Home</Link></Breadcrumb.Item>
            <Breadcrumb.Item><Link to="/news"><Icon type="rise" /> News</Link></Breadcrumb.Item>
            <Breadcrumb.Item>{currentNews.title}</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="title"><h1>{currentNews.title}</h1></div>
        <div className="article-info">
          <Avatar size={64} src="https://www.bbc.co.uk/news/special/2015/newsspec_10857/bbc_news_logo.png" />
          <div className="article-subtitle">
            <div className="source">{currentNews.source}</div>
            <div className="post-time">Post Time: {moment().fromNow()}</div>
          </div>
          <div className="article-follow">
            <Button shape="round" onClick={this.handleFollow} disabled={UserStore.user.isAnonymous}>
              <Icon type="star" theme={theme}/>
              {value}
            </Button>
          </div>
        </div>


        <div className="article-img">
          <img alt="cover" src={currentNews.url}/>
        </div>
        <div className="tags">Category: <Tag color="cyan">cyan</Tag></div>
        <div className="description">Description: {currentNews.description}</div>

        <Divider/>
        <div className="content">{this.renderBody(currentNews.body)}</div>
        <Divider/>
      </div>

    )
  }
}

decorate(NewsDetail, {
  NewsDetail: observer,
});

export default NewsDetail