import React from 'react';
import './Post.scss';

import PropTypes from 'prop-types';

import { User } from '../User/User';
import { CommentsList } from '../CommentsList/CommentsList';

export const Post = ({ post }) => (
  <div className="Post">
    <User
      {...post.user}
    />
    <div className="PostInfo">
      <div className="PostBody">
        <h2 className="PostTitle">{post.post.title}</h2>
        <p className="PostText">{post.post.text}</p>
      </div>
      <CommentsList
        comments={post.comments}
      />
    </div>
  </div>
);

Post.propTypes = {
  post: PropTypes.shape().isRequired,
};
