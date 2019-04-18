import React, { Component } from 'react';
import {Tag} from 'antd';
import '../styles/NewsItem.scss'
import { Link } from 'react-router-dom'


class NewsItem extends Component {
  render() {
      const now = new Date();
      return (
          <div className="round-container">
            <div className="content">
              <Link to={{pathname: `/news/${this.props.item.id}`}}>
                <div className="title">{this.props.item.title}</div>
              </Link>
              <div className="post-time">Posted at: {now.toString()}</div>
              <div className="description">{this.props.item.description}</div>
              <div className="tags">Tag: <Tag color="cyan">cyan</Tag></div>
            </div>
            <div className="image">
              <Link to={{pathname: `/news/${this.props.item.id}`}}>
                <img alt="logo" src={this.props.item.url}/>
              </Link>
            </div>
          </div>
        )
  }
}

export default NewsItem