import React from 'react';
import PropTypes from 'prop-types';
import User from './User';
import CommentList from './CommentList';

const Post = ({ currentPost }) => (
  <div className="post1">
    <p>
      <b>User:</b>
      {' '}
      <User user={currentPost.user} />
    </p>
    <h2>
      <b>Title:</b>
      {' '}
      {currentPost.title}
    </h2>
    <p>
      <b>Body:</b>
      {' '}
      {currentPost.body}
    </p>
    <p>
      <b>Comments:</b>
      <CommentList comments={currentPost.comments} />
    </p>
  </div>
);

Post.propTypes = { currentPost: PropTypes.objectOf(PropTypes).isRequired };

export default Post;
