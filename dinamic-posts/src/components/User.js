import React, { Component } from 'react';
import './User.css';

class User extends Component {

  render() {

      return (
        <div>
          <span className="user-name">{this.props.name}</span>
          <span className="user-email">{this.props.email}</span>
          <span className="user-info">{this.props.address.suite} {this.props.address.street} {this.props.address.city} {this.props.address.zipcode}</span>
        </div>
      );
  }
}

export default User;
