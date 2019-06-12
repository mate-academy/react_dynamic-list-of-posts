import React, { Component } from 'react';

export default class User extends Component {
  render() {
    return (
      <div className="author-email">
        <span> - <strong>{this.props.user.name}</strong></span>
        <span> {this.props.user.email}</span>
      </div>
    )
  }

}
