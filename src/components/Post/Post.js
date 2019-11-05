import React from 'react';
import User from "../User/User";
import CommentList from '../CommentList/CommentList';
import './post.css';

function Post({post}) {
  const {title, body, comments} = post;

  return (
    <div className="main-post">
      <div className="post">
        <h3>{title}</h3>
        <p>{body}</p>
        <User user={post.user} />
      </div>
      <CommentList comments={comments} key={comments.id} />
    </div>
  );
}
export default Post;
