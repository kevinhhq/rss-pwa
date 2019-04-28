import React, { Component } from 'react';
import {Avatar, Card, Button} from "antd";
import "../styles/FollowedItem.scss";
import {Link} from "react-router-dom";

class FollowedItem extends Component {
  render() {
      return (
        <Card className="item-card">
          <div className="item-container">
            <Link to={this.props.type==='other'? "/news/" : `/news/?${this.props.type}=${this.props.name}`}>
              <Avatar size={50} style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
                {this.props.name[0].toUpperCase()}
              </Avatar>
            </Link>
            <div className="item-description">
              <Link to={this.props.type==='other'? "/news/" : `/news/?${this.props.type}=${this.props.name}`}>
                {this.props.name.toUpperCase()}
              </Link>
            </div>
            <div className="item-operation">
              <Button shape="circle" icon="delete" type="danger"/>
            </div>
          </div>
        </Card>
      );
    }
}

export default FollowedItem;