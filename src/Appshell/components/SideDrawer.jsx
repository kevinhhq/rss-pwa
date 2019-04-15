import React, { Component } from 'react';
import {Drawer, Button, Menu, Icon} from 'antd';
import "../styles/SideDrawer.scss";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class SideDrawer extends Component {
    state = { visible: false, placement: 'left' };
    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    onChange = (e) => {
        this.setState({
            placement: e.target.value,
        });
    };

    handleClick = (e) => {
        console.log('click ', e);
    };

    renderMenu = () => <Menu
        onClick={this.handleClick}
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1', 'sub2', 'sub3']}
        mode="inline"
    >
        <SubMenu key="sub1" title={<span><Icon type="user" /><span>My Subscriptions</span></span>}>
            <Menu.Item key="1"><Icon type="eye" />My News</Menu.Item>
            <Menu.Item key="2"><Icon type="pushpin" />My Sites</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" title={<span><Icon type="solution" /><span>News</span></span>}>
            <Menu.Item key="3"><Icon type="environment" />U.S.</Menu.Item>
            <Menu.Item key="4"><Icon type="global" />World</Menu.Item>
            <SubMenu key="sub3" title={<span><Icon type="appstore" />Categories</span>}>
                <Menu.Item key="5"><Icon type="dollar" />Business</Menu.Item>
                <Menu.Item key="6"><Icon type="laptop" />Technology</Menu.Item>
                <Menu.Item key="7"><Icon type="coffee" />Entertainment</Menu.Item>
                <Menu.Item key="8"><Icon type="trophy" />Sports</Menu.Item>
                <Menu.Item key="9"><Icon type="experiment" />Science</Menu.Item>
                <Menu.Item key="10"><Icon type="heart" />Health</Menu.Item>
            </SubMenu>
        </SubMenu>
        <SubMenu key="sub4" title={<span><Icon type="setting" /><span>Others</span></span>}>
            <Menu.Item key="11"><Icon type="team" />About us</Menu.Item>
            <Menu.Item key="12"><Icon type="link" />Course link</Menu.Item>
        </SubMenu>
    </Menu>

    render() {
        return(
            <div>
                <Button shape="circle" icon="bars" size="large" onClick={this.showDrawer} style={{border: "none"}}/>
                <Drawer
                    placement="left"
                    title="GOATNews"
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    {this.renderMenu()}
                </Drawer>
            </div>
        );
    }
}

export default SideDrawer;