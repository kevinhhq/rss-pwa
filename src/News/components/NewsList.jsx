import React, { Component } from 'react';
import IconText from './IconText'
import { List } from 'antd';
import '../styles/NewsList.scss';
import {Link} from "react-router-dom";
import news_list from "../../mock/news_list"
import axios from "axios";


class NewsList extends Component {
  constructor(){
    super();
    this.state = {
      mockData: [],
    }
  }

  componentDidMount() {
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
  
  renderList = () =>
    <List
      itemLayout="vertical"
      size="large"
      dataSource={this.state.mockData}
      renderItem={item => (
        <List.Item
          // key={item.title}
          actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
          extra={<img width={272} alt="logo" src={item.url} />}
        >
          <Link to={{pathname:`/news/${item.id}`, state: {news: item}}}>
            <div className="item-title">{item.title}</div>
          </Link>

          <List.Item.Meta
            description={item.description}
          />
        </List.Item>
      )}
    />
    ;

  render() {
    let allNews;
    if (this.state.mockData.length !== 0) {
      allNews = this.renderList();
    }
    return (
      <div className="container">
        <br/>
        <h1>Top News</h1>
        <div className="list-container">
          {allNews}
        </div>
      </div>

    );
  }

}

export default NewsList