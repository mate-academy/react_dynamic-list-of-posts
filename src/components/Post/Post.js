import React from 'react';
import './Post.css';
import User from '../User/User';
import CommentList from '../CommentList/CommentList';

// eslint-disable-next-line react/prop-types
function Post({ post }) {
  const {
    title, body, user, comments,
  } = post;

  return (
    <li className="post">
      <header className="post-header">
        {title}
      </header>
      <p className="post-body">
        {body}
      </p>
      <User user={user} showAddress />
      <CommentList commentList={comments} />
    </li>
  );
}

export default Post;
