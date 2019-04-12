import React, { Component } from 'react';
import news_list from '../../mock/news_list';
import IconText from './IconText'
import { List, Icon } from 'antd';
import '../styles/ListView.scss';
import {Link} from "react-router-dom";



class ListView extends Component {
  constructor(){
    super();
    this.state = {
      mockData: news_list,
    }
  }

  renderList = () =>
    <List
      itemLayout="vertical"
      size="large"
      // pagination={{
      //   onChange: (page) => {
      //     console.log(page);
      //   },
      //   pageSize: 3,
      // }}
      dataSource={this.state.mockData}
      renderItem={item => (
        <List.Item
          // key={item.title}
          actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
          extra={<img width={272} alt="logo" src={item.url} />}
        >
          <Link to={{pathname:'/detail', state: {news: item}}}>
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

export default ListView