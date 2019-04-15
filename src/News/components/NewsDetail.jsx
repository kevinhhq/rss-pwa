import React, { Component } from 'react';
import '../styles/NewsDetail.scss';
import { Button } from 'antd';
import axios from "axios";



class NewsDetail extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     news: []
  //   };
  //   this.baseUrl = '';
  // }
  //
  // getNews() {
  //   let id = this.props.match.params.id;
  //   let url = `${this.baseUrl}/${id}`;
  //   axios.get(url).then((response) => {
  //     this.setState({
  //       news: response.data
  //     });
  //   })
  // }
  //
  // componentDidMount() {
  //   this.getNews();
  // }
  //
  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   if(this.props.match.params.id !== prevProps.match.params.id) {
  //     this.getNews();
  //   }
  // }

  render() {
    //const currentNews = this.state.news;
    const currentNews = this.props.location.state.news;
    return (
      <div className="container">
        <article className="content-container">
          <div className="title">
            <h1>{currentNews.title}</h1>
            <div><img alt="example" src={currentNews.url} /></div>
            <Button type="primary">Subscribe</Button>
          </div>
          {/*<div>*/}
          {/*<p>{currentNews.content}</p>*/}
          {/*</div>*/}
        </article>
      </div>

    )
  }
}

export default NewsDetail