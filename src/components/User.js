import React, { Component } from 'react';

class User extends Component {
  render() {
    const {
      user: {
        email, name, address,
      },
    } = this.props;

    return (
      <div className="meta">
        <span>{ name }</span>
        <br />
        <a href={`mailto:${email}`}>{email}</a>
        <br />
        <div>
          <span>
            City:
            {address.city}
          </span>
          <br />
        </div>
      </div>
    );
  }
}

export default User;
