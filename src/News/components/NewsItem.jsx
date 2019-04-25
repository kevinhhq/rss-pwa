import React, { Component } from 'react';
import {Tag} from 'antd';
import '../styles/NewsItem.scss'
import { Link } from 'react-router-dom'
import Image from './Image'



class NewsItem extends Component {

  render() {
      let tags;
      if (this.props.item.hashtags) {
        tags = this.props.item.hashtags.map(item =>
          <Tag color="cyan">{item}</Tag>
        )
      }
      return (
          <div className="round-container">
            <div className="content">
              <Link to={{pathname: `/news/${this.props.item.id}`}}>
                <div className="title">{this.props.item.title}</div>
              </Link>
              <div className="post-time">Posted at: {this.props.item.time}</div>
              <div className="description">{this.props.item.summary}</div>
              <div className="tags">Hashtags: {tags}</div>
            </div>
            <div className="image">
              <Link to={{pathname: `/news/${this.props.item.id}`}}>
                <Image address={this.props.item.img} source={this.props.item.source}/>
              </Link>
            </div>
          </div>
        )
  }
}

export default NewsItem