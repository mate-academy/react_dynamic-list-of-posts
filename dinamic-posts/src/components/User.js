import React, { Component } from 'react';

class User extends Component {

  render() {

      return (
        <div>
          <h3>{this.props.name}</h3>
          <h3>{this.props.email}</h3>
          <h6>{this.props.address.suite} {this.props.address.street} {this.props.address.city} {this.props.address.zipcode}</h6>
        </div>
      );
  }
}

export default User;
