import React from 'react';

export default function User (props) {
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
