import React, { Component } from 'react';

export default class User extends Component {
  render() {
    return (
      <td>
        {`${this.props.author.address.city}, ${this.props.author.address.zipcode}, ${this.props.author.address.street}`}
      </td>
   );
  }
}
