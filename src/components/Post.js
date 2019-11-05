import React from 'react';
import PropTypes from 'prop-types';
import CommentList from './CommentList';
import User from './User';

const Post = ({ post }) => (
  <li>
    <h2>{post.title}</h2>
    <p>{post.body}</p>
    <User user={post.user} />
    <CommentList comments={post.comments} />
  </li>
);

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
    user: PropTypes.object,
    comments: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default Post;
