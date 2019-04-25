import React, { Component } from 'react';
import '../styles/NewsList.scss';
import { Card, Tabs, Skeleton, Icon, Empty } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom'

const TabPane = Tabs.TabPane;
const { Meta } = Card;


class NewsList extends Component {
    state = {
        news: [],
        loading: true,
    };

    componentDidMount() {
        this.setState({loading: true, news:[]});
        axios.get(`http://localhost:5000/offline/category/business`).then(
            res => {
                this.setState({news: res.data.slice(0,3), loading: false})
            }
        ).catch(err => {
            console.log(err);
            this.setState({news: [], loading: false});
        });
    }

    onTabChange = (key) => {
        this.setState({loading: true, news:[]});
        axios.get(`http://localhost:5000/offline/category/${key}`).then(
            res => {
                this.setState({news: res.data.slice(0,3), loading: false})
            }
        ).catch(err => {
            console.log(err);
            this.setState({news: [], loading: false});
        });
    };

    renderCard = (category) => {
        if (this.state.loading ) {
            return <Skeleton/>
        }
        if (this.state.news.length === 0) {
            return <Empty/>
        }

       return <div className="news-card-list">
           {this.state.news.map((news,index) =>
                <Link key={index} to={{pathname: `/news/${news.id}`, state: {news: news}}}>
                    <Card
                        key={index}
                        hoverable
                        bordered={false}
                        style={{width: 300}}
                        cover={<img src={news.img} alt={"N/A"}/>}
                    >

                        <Meta
                            title={news.title}
                        />
                        <div>
                            <Icon type="clock-circle" />{news.time}
                        </div>
                    </Card>
                </Link>)}
        </div>;
    };

    render() {
        return (
            <div>
                <div>
                    <Tabs defaultActiveKey="1" onChange={this.onTabChange}>
                        <TabPane tab="Business" key="business">{this.renderCard()}</TabPane>
                        <TabPane tab="Technology" key="technology">{this.renderCard()}</TabPane>
                        <TabPane tab="Entertainment" key="entertainment">{this.renderCard()}</TabPane>
                        <TabPane tab="Sport" key="sport">{this.renderCard()}</TabPane>
                        <TabPane tab="Science" key="science">{this.renderCard()}</TabPane>
                        <TabPane tab="Health" key="health">{this.renderCard()}</TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}
export default NewsList;