import React, { Component } from 'react';
import '../styles/NewsDetail.scss';
import { Button, Empty, Tag} from 'antd';
import news_list from "../../mock/news_list"

class NewsDetail extends Component {
  constructor(){
    super();
    this.state = {
      currentNews: {},
    }
  }

  componentDidMount() {
    this.setState({currentNews: news_list[this.props.match.params.id - 1]});
  }

  render() {
    const tempDate = new Date();
    const {currentNews} = this.state;
    if (!currentNews) {
      return <div className="detail-container">
          <Empty/>
      </div>
    }
    return (
      <div className="detail-container">
        <div className="breadcrumb"></div>
        <div className="title"><h1>{currentNews.title}</h1></div>
        <div className="image">
          <img alt="cover" src={currentNews.url}/>
          <div className="tags">Category: <Tag color="cyan">cyan</Tag></div>
          <div className="post-time">{tempDate.toString()}</div>
          <div className="media">
            <div className="source">Source: {currentNews.source}</div>
            <div><Button type="primary" size="small">Subscribe</Button></div>
          </div>
        </div>

        <br/>
        <div className="content">{currentNews.temp}</div>
      </div>

    )
  }
}

export default NewsDetail