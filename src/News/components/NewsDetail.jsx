import React, { Component } from 'react';
import '../styles/NewsDetail.scss';
import { Button, Empty, Tag, Modal, Breadcrumb, Icon} from 'antd';
import news_list from "../../mock/news_list"
import { Link } from 'react-router-dom'


class NewsDetail extends Component {
  constructor(){
    super();
    this.state = {
      currentNews: {},
      subscribed: false,
      visible: false
    }
  }

  componentDidMount() {
    this.setState({currentNews: news_list[this.props.match.params.id - 1]});
    // set subscribed
  }

  handleClick = () => {
    const currState = this.state.subscribed;
    if (currState) {this.showModal()}
    else {this.setState({subscribed: true})}
  };

  showModal = () => {
    this.setState({
      visible: true
    })
  };

  handleOk = () => {
    this.setState({subscribed: false});
    this.setState({ visible: false });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const type = this.state.subscribed ? "default" : "primary";
    const value = this.state.subscribed ? "Subscribed" : "Subscribe";
    const tempDate = new Date();
    const {currentNews} = this.state;
    if (!currentNews) {
      return <div className="detail-container">
          <Empty/>
      </div>
    }
    return (
      <div className="detail-container">
        <div className="breadcrumb">
          <Breadcrumb>
            <Breadcrumb.Item><Link to="/"><Icon type="home"/> Home</Link></Breadcrumb.Item>
            <Breadcrumb.Item><Link to="/news"><Icon type="rise" /> Trend News</Link></Breadcrumb.Item>
            <Breadcrumb.Item>Detail</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="title"><h1>{currentNews.title}</h1></div>
        <div className="image">
          <img alt="cover" src={currentNews.url}/>
          <div className="tags">Category: <Tag color="cyan">cyan</Tag></div>
          <div className="post-time">{tempDate.toString()}</div>
          <div className="media">
            <div className="source">Source: {currentNews.source}</div>
            <div><Button type={type} size="small" onClick={this.handleClick}>{value}</Button></div>
          </div>
          <Modal
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[
              <Button key="Cancel" onClick={this.handleCancel}>Cancel</Button>,
              <Button key="Unsubscribe" type="primary" onClick={this.handleOk}>
                Unsubscribe
              </Button>,
            ]}
          >
            <p>Are you sure to Unsubscribe from {currentNews.source}</p>
          </Modal>
        </div>

        <br/>
        <div className="content">{currentNews.temp}</div>
      </div>

    )
  }
}

export default NewsDetail