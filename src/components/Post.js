import React from 'react';
import User from './User';

export default function Post(props) {
    return (
      <div className="article">
        <h2>{props.data.title}</h2>
        <User author={props.data.user} />
        <p>{props.data.body}</p>
      </div>
    );
}
