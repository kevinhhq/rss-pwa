import React, { Component } from 'react';
import logo from '../../logo.svg';
import { PageHeader, Button } from 'antd';
import '../styles/Home.css';

class Home extends Component {
    render() {
        return (
            <div>
                <PageHeader onBack={() => null} title="Title" subTitle="This is a subtitle"
                            extra={[
                                <Button key="3">Operation</Button>,
                                <Button key="2">Operation</Button>,
                                <Button key="1" type="primary">
                                    Primary
                                </Button>,
                            ]}
                />
                <div className="Home">
                    <div className="Home-header">
                        <img src={logo} className="Home-logo" alt="logo" />
                        <p>
                            <code>Welcome to PWA</code>
                        </p>
                        <a
                            className="Home-link"
                            href="https://reactjs.org"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Learn React
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
