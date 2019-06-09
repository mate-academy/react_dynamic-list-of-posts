import React, { Component } from 'react';

export default class User extends Component {
  render() {
    return (
      <div>
        <h4>
          <i>{this.props.author.name}</i> <i>{this.props.author.email}</i>
        </h4>
        <div className="address">
          <i>{this.props.author.address.street}</i>
          <i>{this.props.author.address.suite}</i>
          <i>{this.props.author.address.city}</i>
        </div>
      </div>
    );
  }
}
