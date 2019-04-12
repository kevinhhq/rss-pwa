import React, { Component } from 'react';
import '../styles/MediaList.scss';
import { Card, Skeleton } from 'antd';
import media_list from '../../mock/media_list.json';

const { Meta } = Card;

class MediaList extends Component {
    state = {
        mockData: media_list,
    };

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
                        <Meta
                            title={news.title}
                            description="example description"
                        />
                    </Card>)}
            </div>
        );
    }
}
export default MediaList;