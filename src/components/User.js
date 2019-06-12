import React from 'react';

class User extends React.Component {
  render() {
    return (
      <>
        <h3>{this.props.user.name}</h3>
        <a href={`mailto: ${this.props.user.email}`}>{this.props.user.email}</a>
      </>
    )
  }
}

export default User;
