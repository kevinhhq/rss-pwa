import React, { Component } from 'react';

class NewsDetail extends Component {
  render() {
    const currentNews = this.props.location.state.news;
    return (
      <div>
        <h1>{currentNews.title}</h1>
        <img alt="example" src={currentNews.url} />
      </div>

    )
  }
}

export default NewsDetail