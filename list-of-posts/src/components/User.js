import React from 'react';

export default function User(props) {
    return <div className="author-email">
        <span> - <strong>{props.user.name}</strong></span>
        <span> {props.user.email}</span>
      </div>

}
