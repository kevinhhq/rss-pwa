import React, { Component } from 'react';
import '../styles/NewsList.scss';
import { Card, Tabs, Skeleton, Icon, Empty } from 'antd';
import news_list from "../../mock/news_list"
import axios from 'axios';
import { Link } from 'react-router-dom'

const TabPane = Tabs.TabPane;
const { Meta } = Card;


class NewsList extends Component {
    state = {
        mockImages: [],
    };

    componentDidMount() {
        this.setState({mockImages: news_list});
        /*
        axios.get("http://my-json-server.typicode.com/DeepinSC/rss-pwa/news_list").then(
            res => {
                this.setState({mockImages: res.data})
            }
        ).catch(err => {
            console.log(err);
            this.setState({mockImages: []});
        })
        */
    }


    callback = (key) => {
        //console.log(key);
    };

    renderCard = (key=1) => {
        if (this.state.mockImages === null) {
            return <Empty/>
        }

       return <div className="news-card-list">
            {this.state.mockImages.length === 0 ?
                <Skeleton/>
                : this.state.mockImages.map(news =>
                    <Link key={news.title} to={{pathname: `/news/${news.id}`, state: {news: news}}}>
                        <Card
                            key={news.title}
                            hoverable
                            bordered={false}
                            style={{width: 300}}
                            cover={<img alt="example" src={news.url}/>}
                        >
                            <Meta
                                title={news.title}
                            />
                            <div>
                                <Icon type="message"/>100
                            </div>
                        </Card>
                    </Link>)}
        </div>;
    };

    render() {
        return (
            <div>
                <div>
                    <Tabs defaultActiveKey="1" onChange={this.callback}>
                        <TabPane tab="Business" key="1">{this.renderCard()}</TabPane>
                        <TabPane tab="Technology" key="2">{this.renderCard()}</TabPane>
                        <TabPane tab="Entertainment" key="3">{this.renderCard()}</TabPane>
                        <TabPane tab="Sport" key="4">{this.renderCard()}</TabPane>
                        <TabPane tab="Science" key="5">{this.renderCard()}</TabPane>
                        <TabPane tab="Health" key="6">{this.renderCard()}</TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}
export default NewsList;