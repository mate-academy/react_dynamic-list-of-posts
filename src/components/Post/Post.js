import React from 'react';
import './Post.scss';
import { PostProps } from '../../constants/proptypes';

import User from '../User/User';
import CommentList from '../CommentList/CommentList';

const Post = ({
  key, post, user, comments,
}) => {
  const { title, body } = post;

  return (
    <div className="post" key={key}>
      <div className="post__author">
        <User user={user} />
      </div>
      <h2 className="post__title">{title}</h2>
      <p className="post__body">{body}</p>
      <div className="post__comments">
        <CommentList comments={comments} />
      </div>
    </div>
  );
};

Post.propTypes = PostProps;

export default Post;
