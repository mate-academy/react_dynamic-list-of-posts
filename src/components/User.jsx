import React, { Component } from 'react';

export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return(
      <div className="user-info">
        <div>{this.props.user.name}</div>
        <div>
          <a href={`mailto:${this.props.user.email}`}>
            {this.props.user.username}
          </a>
        </div>
      </div>
    )
  }
}
