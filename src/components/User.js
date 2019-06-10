import React from 'react';

export default function User(props) {
    return (
      <div>
        <h4>
          <i>{props.author.name}</i> <i>{props.author.email}</i>
        </h4>
        <div className="address">
          <i>{props.author.address.street}</i>
          <i>{props.author.address.suite}</i>
          <i>{props.author.address.city}</i>
        </div>
      </div>
    );
}
