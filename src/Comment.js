import React from 'react';
import PropTypes from 'prop-types';

const Comment = ({ comment }) => (
  <li>
    <p className="comment">{comment.name}</p>
    <p className="comment">{comment.body}</p>
    <p className="comment">{comment.email}</p>
  </li>
);

Comment.propTypes
  = { comment: PropTypes.objectOf(PropTypes.string).isRequired };

export default Comment;
