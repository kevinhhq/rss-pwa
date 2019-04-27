import React, { Component } from 'react';
import '../styles/NewsDetail.scss';
import { Button, Empty, Tag, Breadcrumb, Icon, Divider, Avatar, message} from 'antd';
import { Link } from 'react-router-dom'
import {decorate} from "mobx";
import {observer} from "mobx-react";
import UserStore from "../../Appshell/stores/UserStore";
import axios from 'axios';
import Image from "./Image";


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
    let id = this.props.match.params.id;
    axios.get(`http://localhost:3000/api/offline/${id}`).then(
      res => {
        this.setState({
          currentNews: res.data,
        })
      }
    );
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
          <Avatar
            size={64}
            style={{fontSize: '30px', color: '#13c2c2', backgroundColor: '#e6fffb'}}>
            {currentNews.source[0]}
          </Avatar>
          <div className="article-subtitle">
            <div className="source">{currentNews.source}</div>
            <div className="post-time">Post Time: {currentNews.time}</div>
          </div>
          <div className="article-follow">
            <Button shape="round" onClick={this.handleFollow} disabled={UserStore.user.isAnonymous}>
              <Icon type="star" theme={theme}/>
              {value}
            </Button>
          </div>
        </div>


        <div className="article-img">
          <Image type={"detail"} address={currentNews.img} source={currentNews.source}/>
        </div>
        <div className="tags">Category: <Tag color="cyan">{currentNews.category}</Tag></div>
        <div className="description">Description: {currentNews.summary}</div>

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