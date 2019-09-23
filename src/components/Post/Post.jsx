import React from 'react';
import './Post.scss';
import User from '../User/User';
import CommentsList from '../CommentsList/CommentsList';

function Post({ post }) {
  const { user, comments } = post;

  return (
    <div className="post">
      <User user={user} />
      <h2 className="post__name">{`Title: ${post.title}`}</h2>
      <h3 className="post__body">{`Body: ${post.body}`}</h3>
      <CommentsList comments={comments} />
    </div>
  );
}

export default Post;
