import React from 'react';
import PropTypes from 'prop-types';

import './Post.css';
import User from '../User/User';
import CommentList from '../CommentList/CommentList';

const Post = ({ post }) => (
  <div className="post">
    <User user={post.user} />
    <h2 className="post__title">{post.title}</h2>
    <CommentList comments={post.comments} />
  </div>
);

Post.propTypes = {
  post: PropTypes.shape({
    user: PropTypes.object,
    title: PropTypes.string.isRequired,
    comments: PropTypes.array,
  }).isRequired,
};

export default Post;
