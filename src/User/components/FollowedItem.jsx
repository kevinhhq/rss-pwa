import React, { Component } from 'react';
import {Avatar, Card, Button, Spin} from "antd";
import "../styles/FollowedItem.scss";

class FollowedItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
      return (
        <Card className="item-card">
          <div className="item-container">
            <Avatar size={50} style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>{this.props.name[0]}</Avatar>
            <div className="item-description">{this.props.name}</div>
            <div className="item-operation">
              <Button shape="circle" icon="delete" type="danger"/>
            </div>
          </div>
        </Card>
      );
    }
}

export default FollowedItem;