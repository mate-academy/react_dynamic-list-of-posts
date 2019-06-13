import React from 'react';


class User extends React.Component {
  render () {
    return (
      <div className="user">
        <p className="user-name">{this.props.user.name}</p>
        <p className="user-email"><a href={`mailto:${this.props.user.email}`}>{this.props.user.email}</a></p>
        <p className="user-address">Address : {this.props.user.address.city}, {this.props.user.address.street}, {this.props.user.address.suite}</p>
      </div>
    );
  }
}

export default User;
