import React from 'react';
import PropTypes from 'prop-types';
import User from './User';
import CommentsList from './CommentsList';

const Post = ({ post }) => (
  <div className="post">
    <p className="post__title">{post.title}</p>
    <p className="post__body">{post.body}</p>
    <User user={post.user} />
    <CommentsList comments={post.comments} />
  </div>
);

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
    comments: PropTypes.object,
  }).isRequired,
};

export default Post;
