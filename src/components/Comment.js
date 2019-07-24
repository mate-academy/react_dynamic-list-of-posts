import React from 'react';
import PropTypes from 'prop-types';

function Comment({ currentComment }) {
  return (
    <div className="comment">
      <span className="comment__name">{currentComment.name}</span>
      <span className="comment__email">{currentComment.email}</span>
      <p className="comment__body">{currentComment.body}</p>
    </div>
  );
}

Comment.propTypes = {
  currentComment: PropTypes.shape({
  }).isRequired,
};

export default Comment;
