import React from 'react';
import PropTypes from 'prop-types';

function Comment({ comments }) {
  return (
    <div className="comment-block">
      <h4>{comments.email}</h4>
      <h3>{comments.name}</h3>
    </div>
  );
}

Comment.propTypes = {
  comments: PropTypes.shape({
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default Comment;
