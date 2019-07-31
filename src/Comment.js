import React from 'react';
import PropTypes from 'prop-types';

function Comment({ comment, isActive }) {
  return (
    isActive
      ? (
        <div className="comment">
          <h4>{comment.name}</h4>
          <p>{comment.body}</p>
          <span>{comment.email}</span>
        </div>
      )
      : null
  );
}

Comment.propTypes = {
  comment: PropTypes.object,
  name: PropTypes.string,
  body: PropTypes.string,
  email: PropTypes.string,
}.isRequired;

export default Comment;
