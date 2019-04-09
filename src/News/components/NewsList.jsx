import React, { Component } from 'react';
import '../styles/NewsList.scss';
import { Card, Tabs, Spin } from 'antd';
import axios from 'axios';

const TabPane = Tabs.TabPane;
const { Meta } = Card;

const mockImages = [
];

class NewsList extends Component {
    state = {
        mockImages: [],
    };

    componentDidMount() {
        axios.get("http://my-json-server.typicode.com/DeepinSC/rss-pwa/blob/master/db.json").then(
            lst => {
                this.setState({mockImages: lst})
            }
        )
    }


    callback = (key) => {
        console.log(key);
    };

    renderCard = (key=1) =>
        <div className="news-card-list">
            {this.state.mockImages.map(news => <Card
                hoverable
                bordered={false}
                style={{ width: 240 }}
                cover={<img alt="example" src={news.url} />}
            >
                <Meta
                    title={news.title}
                    description="example description"
                />
            </Card>)}
        </div>;

    render() {
        if(this.state.mockImages.length === 0) {
            return <div style={{textAlign: "center"}}>
                        <Spin/>
                   </div>
        }

        return (
            <div>
                <h1> Trend news </h1>
                <div>
                    <Tabs defaultActiveKey="1" onChange={this.callback}>
                        <TabPane tab="Tab 1" key="1">{this.renderCard()}</TabPane>
                        <TabPane tab="Tab 2" key="2">{this.renderCard()}</TabPane>
                        <TabPane tab="Tab 3" key="3">{this.renderCard()}</TabPane>
                    </Tabs>
                </div>
                <div>
                </div>
            </div>
        );
    }
}
export default NewsList;