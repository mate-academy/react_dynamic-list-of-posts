import React, { Component } from 'react';

class User extends Component {
  render() {   
    return (
      <>
        Author: {this.props.user.name}
      </>
    );
  }
}

export default User;