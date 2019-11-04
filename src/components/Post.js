import React from 'react';
import PropTypes from 'prop-types';
import User from './User';
import CommentList from './CommentList';

const Post = ({ post }) => (
  <tr>
    <td>{post.title}</td>
    <td>{post.body}</td>
    <User user={post.user} />
    <CommentList comments={post.comments} />
  </tr>
);

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.number,
    user: PropTypes.object,
  }).isRequired,
};

export default Post;
