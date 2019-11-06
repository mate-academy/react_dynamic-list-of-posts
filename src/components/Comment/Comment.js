import React from 'react';
import PropTypes from 'prop-types';

function Comment({ comment }) {
  return (
    <li className="comment">
      <p className="comment-body">{comment.body}</p>
      <p className="comment-author">{`${comment.name}, ${comment.email}`}</p>
    </li>
  );
}

Comment.defaultProps = {
  comment: {},
};

Comment.propTypes = {
  comment: PropTypes.objectOf,
};

export default Comment;
