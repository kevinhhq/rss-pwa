import React, { Component } from 'react';
import '../styles/NewsList.scss';
import {Button, Divider, Icon, Empty} from 'antd';
import axios from "axios";
import NewsItem from './NewsItem'


class NewsList extends Component {
  constructor(){
    super();
    this.state = {
      mockData: [],
      following: false,
      category: "HEADLINE",
    }
  }

  componentDidMount() {
    this.parseSearch(this.props);
  }

  parseSearch = (props) => {
    if (!props.location.search) {
      axios.get("http://localhost:5000/offline/").then(
        res => {
          this.setState({mockData: res.data})
        }
      );
    }
    else {
      const search = props.location.search;
      const params = new URLSearchParams(search);
      if (params.get('category')) {
        axios.get(`http://localhost:5000/offline/category/${params.get('category')}`).then(
          res => {
            this.setState({
              mockData: res.data,
              category: params.get('category').toUpperCase()
            })
          }
        );
      }

      else if (params.get('news')) {
        axios.get(`http://localhost:5000/offline/${params.get('news')}`).then(
            res => {
              this.setState({
                mockData: res.data,
                category: "SEARCH RESULT"
              })
            }
        );
      }

      else if (params.get('site')) {
        axios.get(`http://localhost:5000/offline/${params.get('site')}`).then(
            res => {
              this.setState({
                mockData: res.data,
                category: params.get('site').toUpperCase()
              })
            }
        );
      }
    }
  };

  handleFollow = () => {
    this.setState({following: !this.state.following});
  };

  render() {
    const value = this.state.following ? "Unfollow" : "Follow";
    const theme = this.state.following ? "filled" : "";
    let allNews = [];
    if (this.state.mockData.length !== 0) {
      // change key to item.id once added
      allNews = this.state.mockData.map(item =>
        <div key={item.title}>
          <NewsItem item={item}/>
          <br/>
        </div>
      );
    }
    // let title = params.get('category') ? "HEADLINE" : params.get('category').toUpperCase();
    return (
      <div className="container">
        <br/>
        <div className="list-headline">
            <h1 className="list-title">{this.state.category}</h1>
            <Button shape="round" onClick={this.handleFollow}>
              <Icon type="star" theme={theme}/>
              {value}
            </Button>
        </div>
        <div className="list-container">
          {allNews || <Empty/>}
        </div>
        <Divider/>
      </div>

    );
  }

}

export default NewsList