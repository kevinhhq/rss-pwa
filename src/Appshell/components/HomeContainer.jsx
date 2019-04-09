import React, { Component } from 'react';
import '../styles/Home.css';
import "../styles/HomeContainer.scss"
import { Input, Select } from 'antd';
import NewsList from '../../News/components/NewsList.jsx'

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
                <section>
                    <div className="trend-news">
                        <NewsList/>
                    </div>
                </section>
            </article>
        );
    }
}
export default HomeContainer;