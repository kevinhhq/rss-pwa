import React, { Component } from 'react';
import '../styles/Home.scss';
import "../styles/HomeContainer.scss"
import { Input, Select, Divider } from 'antd';
import NewsList from '../../Home/components/NewsList.jsx'
import SiteList from '../../Home/components/SiteList.jsx'
import '../styles/Home.scss';
import {Link} from "react-router-dom";


const Option = Select.Option;
const Search = Input.Search;

class HomeContainer extends Component {

    selectBefore = () =>
        <Select defaultValue="Media" style={{width: 90}}>
            <Option value="News">News</Option>
            <Option value="Media">Site</Option>
        </Select>;


    render() {
        return(
            <div className="Home">
                <article className="home-container">
                    <section>
                        <div className="home-container-title">
                            <h1 className="main-title">
                                GOATNews - Progressive Web Application
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
                        <Link to="/news"><h1> Trend News </h1></Link>
                        <NewsList/>
                    </section>
                    <Divider/>
                    <section className="home-sections">
                        <h1> Hot Sites </h1>
                        <SiteList/>
                    </section>
                    <Divider/>
                </article>
            </div>
        );
    }
}
export default HomeContainer;