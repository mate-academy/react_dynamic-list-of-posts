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
        <p>
          <span>
            City:
            {address.city}
          </span>
        </p>
      </div>
    );
  }
}

export default User;
