import React from 'react';
import PropTypes from 'prop-types';
import User from './User';
import CommentList from './CommentList';

const Post = ({ currentPost }) => (
  <div className="post">
    <User user={currentPost.user} />
    <h2>{currentPost.title}</h2>
    <p>{currentPost.body}</p>
    <CommentList comments={currentPost.comments} />
  </div>
);

Post.propTypes = {
  currentPost: PropTypes.shape({
    user: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    comments: PropTypes.string.isRequired,
  }).isRequired,
};

export default Post;
