import React, { Component } from 'react';
import '../styles/NewsDetail.scss';
import { Button } from 'antd';

class NewsDetail extends Component {
  render() {
    const currentNews = this.props.location.state.news;
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