import React, { Component } from 'react';
import '../styles/Home.scss';
import "../styles/HomeContainer.scss"
import { Input, Select } from 'antd';
import NewsList from '../../Home/components/NewsList.jsx'
import MediaList from '../../Home/components/MediaList.jsx'
import '../styles/Home.scss';

const Option = Select.Option;
const Search = Input.Search;

class HomeContainer extends Component {

    selectBefore = () =>
        <Select defaultValue="Media" style={{width: 90}}>
            <Option value="Media">Media</Option>
            <Option value="News">News</Option>
        </Select>;


    render() {
        return(
            <div className="Home">
                <article className="home-container">
                    <section>
                        <div className="home-container-title">
                            <h1 className="main-title">
                                RSS Progressive Web Application
                            </h1>
                            <h1 className="sub-title">
                                Read news without network
                            </h1>
                        </div>
                        <div className="search-bar">
                            <Search addonBefore={this.selectBefore()} placeholder="input search text"/>
                        </div>
                    </section>
                    <section className="home-sections">
                        <h1> Trend News </h1>
                        <NewsList/>
                    </section>
                    <section className="home-sections">
                        <h1> Hot Media </h1>
                        <MediaList/>
                    </section>
                </article>
            </div>
        );
    }
}
export default HomeContainer;