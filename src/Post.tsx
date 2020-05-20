import React from 'react';
import User from './User';
import CommentList from './CommentList';
import './Post.scss';

const Post: React.FC<Post> = ({
  title, body, user, comments,
}) => (
  <div className="post">
    <h2 className="post__title">
      {title}
    </h2>
    <User user={user} />
    <p className="post__body">
      {body}
    </p>
    <CommentList comments={comments} />
  </div>
);

export default Post;
