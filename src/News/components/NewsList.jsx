import React, { Component } from 'react';
import '../styles/NewsList.scss';
import {Button, Divider, Icon, Empty, Skeleton, message} from 'antd';
import axios from "axios";
import NewsItem from './NewsItem'
import {decorate} from "mobx";
import {observer} from "mobx-react";
import UserStore from "../../Appshell/stores/UserStore";


class NewsList extends Component {
  constructor(){
    super();
    this.state = {
      news: [],
      display: [],
      count: 1,
      following: false,
      category: "HEADLINE",
      loading: false,
    }
  }

  componentDidMount() {
    this.parseSearch(this.props);
  }

  parseSearch = (props) => {
    this.setState({loading: true});
    if (!props.location.search) {
      axios.get("http://localhost:3000/api/offline/").then(
        res => {
          this.setState({
            news: res.data || [],
            display: res.data.slice(0, 10),
            loading: false
          })
        }
      );
    }
    else {
      const search = props.location.search;
      const params = new URLSearchParams(search);
      if (params.get('category')) {
        axios.get(`http://localhost:3000/api/offline/category/${params.get('category')}`).then(
          res => {
            this.setState({
              news: res.data || [],
              display: res.data.slice(0, 10),
              category: params.get('category').toUpperCase(),
              loading: false
            })
          }
        );
      }

      else if (params.get('news')) {
        axios.get(`http://localhost:3000/api/offline/${params.get('news')}`).then(
            res => {
              this.setState({
                news: res.data || [],
                category: "SEARCH RESULT",
                loading: false
              })
            }
        );
      }

      else if (params.get('site')) {
        axios.get(`http://localhost:5000/offline/${params.get('site')}`).then(
            res => {
              this.setState({
                news: res.data || [],
                category: params.get('site').toUpperCase(),
                loading: false
              })
            }
        );
      }
    }
  };


  handleFollow = () => {
    axios.put(`http://localhost:3000/api/user/${UserStore.user.uid}`,
        {channel: this.state.category.toLowerCase()}).then(res => {
      this.setState({following: !this.state.following});
    }).catch(err =>
        message.error(err)
    );
  };

  handleMore = () => {
    const currCount = this.state.count + 1;
    const currNews = this.state.news.slice(0, 10*currCount);
    this.setState({
      count: currCount,
      display: currNews
    })
  };

  render() {
    const value = this.state.following ? "Unfollow" : "Follow";
    const theme = this.state.following ? "filled" : "";
    let displayNews = [];
    if (this.state.display.length !== 0) {
      // change key to item.id once added
      displayNews = this.state.display.map(item =>
        <div key={item.title}>
          <NewsItem item={item}/>
          <br/>
        </div>
      );
    }
    return (
      <div className="container">
        <br/>
        <div className="list-headline">
            <h1 className="list-title">{this.state.category}</h1>
            <Button shape="round" onClick={this.handleFollow} disabled={UserStore.user.isAnonymous}>
              <Icon type="star" theme={theme}/>
              {value}
            </Button>
        </div>
        <div className="list-container">
          {this.state.loading ?
              <div>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
              </div>
              : (displayNews.length === 0 ? <Empty description=" "/> : displayNews)}
        </div>
        <Divider>
          {this.state.news.length === this.state.display.length ?
              "No more content" :
            <div className="read-more">
              <Button onClick={this.handleMore} style={{border: "none"}}>
                Read More
                <Icon type="down"/>
              </Button>
            </div>
          }
        </Divider>
      </div>

    );
  }
}

decorate(NewsList, {
  NewsList: observer,
});

export default NewsList