import React, { Component } from 'react';

export default class User extends Component {
  render() {
    return (
    <React.Fragment>
      <td>
        {this.props.author.name}
      </td>
       <td>
        {this.props.author.email}
      </td>
      <td>
          {`${this.props.author.address.city}, ${this.props.author.address.zipcode}, ${this.props.author.address.street}`}
      </td>
    </React.Fragment>
  );
  }
}
