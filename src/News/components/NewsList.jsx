import React, { Component } from 'react';
import '../styles/NewsList.scss';
import news_list from "../../mock/news_list"
import {Button, Divider, Icon, Modal} from 'antd';
import axios from "axios";
import NewsItem from './NewsItem'



class NewsList extends Component {
  constructor(){
    super();
    this.state = {
      mockData: [],
      following: false,
      visible: false,
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

  handleFollow = () => {
    const currState = this.state.following;
    if (currState) {this.showModal()}
    else {this.setState({following: true})}
  };

  showModal = () => {
    this.setState({
      visible: true
    })
  };

  handleOk = () => {
    this.setState({following: false});
    this.setState({ visible: false });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const value = this.state.following ? "Following" : "Follow";
    const theme = this.state.following ? "filled" : "";

    let allNews;
    if (this.state.mockData.length !== 0) {
      allNews = this.state.mockData.map(item =>
        <div key={item.title}>
          <NewsItem item={item}/>
          <br/>
        </div>
      );
    }
    return (
      <div className="container">
        <br/>
        <div className="list-headline">
            <h1 className="list-title">Trend News</h1>
            <Button shape="round" onClick={this.handleFollow}>
              <Icon type="star" theme={theme}/>
              {value}
            </Button>
        </div>
        <div className="list-container">
          {allNews}
        </div>
        <Modal
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="Cancel" onClick={this.handleCancel}>Cancel</Button>,
            <Button key="Unfollow" type="primary" onClick={this.handleOk}>
              Unfollow
            </Button>,
          ]}
        >
          <p>Are you sure to Unfollow Trend News</p>
        </Modal>
        <Divider/>
      </div>

    );
  }

}

export default NewsList