import React from 'react';
import User from '../User/User';
import CommentList from '../CommentList/CommentList';
import { PostProps } from '../PropTypes/PropTypes';

import './Post.css';

const Post = ({
  title, text, user, id, commentList,
}) => (
  <div className="post">
    <User
      name={user.name}
      email={user.email}
      address={user.address}
    />
    <h1 className="post__title">
      {title}
    </h1>
    <p className="post__text">
      {text}
    </p>
    <CommentList
      commentsList={commentList.filter(comment => (
        comment.postId === id
      ))}
    />
  </div>
);

Post.propTypes = PostProps;

export default Post;
