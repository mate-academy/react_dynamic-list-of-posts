import React from 'react';
import User from '../User/User';
import CommentList from '../CommentList/CommentList';
import './Post.css';

const Post = ({ post }) => {
  const { user, comments } = post;

  return (
    <div className="post">
      <User user={user} />
      <h2 className="post__title">
        { post.title.charAt(0).toUpperCase() + post.title.slice(1) }
      </h2>
      <div className="post__body">
        { post.body.charAt(0).toUpperCase() + post.body.slice(1) }
      </div>
      <CommentList comments={comments} />
    </div>
  );
};

export default Post;
