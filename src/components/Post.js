import React from 'react';
import CommentList from './CommentList';
import User from './User';

export default function Post(props) {
  const { title, body, comments } = props;
  const { name, email, address } = props.userInfo;

  return (
    <div className="post">
      <p>title: {title}</p>
      <p>body: {body}</p>
      <User name={name} email={email} address={address} />
      <CommentList commentsInfo={comments} />
    </div>
  );
}

