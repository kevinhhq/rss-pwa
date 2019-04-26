import React, { Component } from 'react';
import '../styles/SiteList.scss';
import {Button, Card, Skeleton, Menu, Dropdown, message, Icon} from 'antd';
import media_list from '../../mock/media_list.json';

class SiteList extends Component {
    state = {
        mockData: media_list,
    };

    onClick = ({ key }) => {
        message.info(`Click on item ${key}`);
    };

    menu = () => (
        <Menu onClick={this.onClick}>
            <Menu.Item key="1"><Icon type="plus" />Follow</Menu.Item>
            <Menu.Item key="2"><Icon type="link" />View the site</Menu.Item>
        </Menu>
    );

    render() {
        return(
            <div className="media-card-list">
                {this.state.mockData.length === 0 ?
                    <Skeleton/>
                    : this.state.mockData.map(news => <Card
                        key={news.title}
                        hoverable
                        bordered={false}
                        style={{ width: 240 }}
                        cover={<img alt="example" src={news.url} />}
                    >
                        <div>
                            <h3>
                                {news.title}
                                <Dropdown overlay={this.menu} trigger={['click']} className="site-list-menu">
                                    <Button icon="more" shape="circle"/>
                                </Dropdown>
                            </h3>
                        </div>
                        <div>
                            sample description
                        </div>
                    </Card>)}
            </div>
        );
    }
}
export default SiteList;