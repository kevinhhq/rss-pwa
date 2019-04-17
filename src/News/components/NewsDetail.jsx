import React, { Component } from 'react';
import '../styles/NewsDetail.scss';
import { Button, Empty } from 'antd';
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
    const {currentNews} = this.state;
    if (!currentNews) {
      return <div className="container">
        <article className="content-container">
          <Empty/>
        </article>
      </div>
    }
    return (
      <div className="container">
        <article className="content-container">
          <div className="title">
            <h1>{currentNews.title}</h1>
            <div><img alt="example" src={currentNews.url} /></div>
            <br/>
            <div className="content">
              <p>{currentNews.description}</p>
              <Button type="primary">Subscribe</Button>
            </div>
          </div>
        </article>
      </div>

    )
  }
}

export default NewsDetail