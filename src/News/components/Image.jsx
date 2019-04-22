import React, { Component } from 'react';
import {Empty} from 'antd';
import '../styles/NewsItem.scss'


class Image extends Component {
  constructor(){
    super();
    this.state = {
      imgErr: false
    }
  }

  handleError = () => {
    this.setState({
      imgErr: true
    })
  };

  render() {
    const item = this.state.imgErr
      ? <Empty description={<span>no image</span>}/>
      : <img alt="logo" src={this.props.address} onError={this.handleError}/>;
    return (
      <div>{item}</div>
    )
  }
}

export default Image