import React, { Component } from 'react';

class User extends Component {
  render() {
    return (
      <React.Fragment>
        <span>{this.props.user.name}, </span>
        <span><a href="#">{this.props.user.email}</a>, </span>
        <span>adress: </span>
        <span>{this.props.user.address.street}, </span>
        <span>{this.props.user.address.suite}, </span>
        <span>{this.props.user.address.city}, </span>
        <span>{this.props.user.address.zipcode}</span>
      </React.Fragment>
    );
  }
}

export default User;
