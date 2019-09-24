import React from 'react';

import User from '../User/User';
import CommentList from '../CommentList/CommentList';

const Post = ({ post }) => {
  const {
    title,
    body,
    user,
    comments
  } = post;
  
  const {
    name,
    email,
    address
  } = user;

  return (
    <>
      <h2>{title}</h2>
      <p>{body}</p>
      <User
        name={name}
        email={email}
        address={address}
      />
      <CommentList comments={comments} />
      <hr />
    </>
  );
}

export default Post;