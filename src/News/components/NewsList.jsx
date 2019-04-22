import React, { Component } from 'react';
import '../styles/NewsList.scss';
import news_list from "../../mock/news_list"
import {Button, Divider, Icon} from 'antd';
import axios from "axios";
import NewsItem from './NewsItem'


class NewsList extends Component {
  constructor(){
    super();
    this.state = {
      mockData: [],
      following: false,
      category: "HEADLINE",
    }
  }

  componentDidMount() {
    this.parseSearch(this.props);
    this.setState({mockData: news_list});
      // TODO: here for PWA usage, the request must be in https, so it should be replaced to safe url.
      /*
    axios.get("http://my-json-server.typicode.com/DeepinSC/rss-pwa/news_list").then(
      res => {
        this.setState({mockData: res.data})
      }
    )
    */
  }

  parseSearch = (props) => {
    if (!props.location.search) return;
    const search = props.location.search;
    const params = new URLSearchParams(search);
    if (params.get('category')) {
      this.setState({category: params.get('category').toUpperCase()})
    }
  };

  handleFollow = () => {
    this.setState({following: !this.state.following});
  };

  render() {
    const value = this.state.following ? "Unfollow" : "Follow";
    const theme = this.state.following ? "filled" : "";

    let allNews;
    if (this.state.mockData.length !== 0) {
      allNews = this.state.mockData.map(item =>
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
            <Button shape="round" onClick={this.handleFollow}>
              <Icon type="star" theme={theme}/>
              {value}
            </Button>
        </div>
        <div className="list-container">
          {allNews}
        </div>
        <Divider/>
      </div>

    );
  }

}

export default NewsList