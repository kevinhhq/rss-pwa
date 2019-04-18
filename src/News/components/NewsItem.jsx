import React, { Component } from 'react';
import '../styles/NewsItem.scss'
import { Link } from 'react-router-dom'


class NewsItem extends Component {
  render() {
    return (
      <div className="round-container">
        <div className="content">
          <Link to={{pathname: `/news/${this.props.item.id}`}}>
            <div className="title">{this.props.item.title}</div>
          </Link>
          <div className="description">{this.props.item.description}</div>
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