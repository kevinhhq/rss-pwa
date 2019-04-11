import React, { Component } from 'react';
import '../styles/NewsList.scss';
import { Card, Tabs, Skeleton } from 'antd';
import axios from 'axios';
import Icon from "antd/es/icon";

const TabPane = Tabs.TabPane;
const { Meta } = Card;


class NewsList extends Component {
    state = {
        mockImages: [],
    };

    componentDidMount() {
        axios.get("http://my-json-server.typicode.com/DeepinSC/rss-pwa/news_list").then(
            res => {
                this.setState({mockImages: res.data})
            }
        )
    }


    callback = (key) => {
        //console.log(key);
    };

    renderCard = (key=1) =>
        <div className="news-card-list">
            {this.state.mockImages.length === 0 ?
                <Skeleton/>
                : this.state.mockImages.map(news => <Card
                key={news.title}
                hoverable
                bordered={false}
                style={{ width: 240 }}
                cover={<img alt="example" src={news.url} />}
            >
                <Meta
                    title={news.title}
                    description="example description"
                />
                <div>
                    <Icon type="message" />100
                </div>
            </Card>)}
        </div>;

    render() {
        return (
            <div>
                <div>
                    <Tabs defaultActiveKey="1" onChange={this.callback}>
                        <TabPane tab="Tab 1" key="1">{this.renderCard()}</TabPane>
                        <TabPane tab="Tab 2" key="2">{this.renderCard()}</TabPane>
                        <TabPane tab="Tab 3" key="3">{this.renderCard()}</TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}
export default NewsList;