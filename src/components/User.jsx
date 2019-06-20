import React from 'react';

export default function User(props) {
  return (
    <div className="user-info">
      <div>{props.user.name}</div>
      <div>
        <a href={`mailto:${props.user.email}`}>
          {props.user.username}
        </a>
      </div>
    </div>
  )
}
