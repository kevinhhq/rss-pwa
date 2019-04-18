import React, { Component } from 'react';
import '../styles/NewsList.scss';
import news_list from "../../mock/news_list"
import axios from "axios";
import NewsItem from './NewsItem'



class NewsList extends Component {
  constructor(){
    super();
    this.state = {
      mockData: [],
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

  render() {
    let allNews;
    if (this.state.mockData.length !== 0) {
      allNews = this.state.mockData.map(item =>
        <div>
          <NewsItem item={item}/>
          <br/>
        </div>
      );
    }
    return (
      <div className="container">
        <br/>
        <h1>Trend News</h1>
        <div className="list-container">
          {allNews}
        </div>
      </div>

    );
  }

}

export default NewsList