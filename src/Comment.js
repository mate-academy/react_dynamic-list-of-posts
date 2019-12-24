import React from 'react';
import PropTypes from 'prop-types';

const Comment = ({ comment }) => (
  <div className="all">
    <ul className="comment">
      <li className="comment__name">{comment.name}</li>
      <li className="comment__body">{comment.body}</li>
      <li className="comment__email">{comment.email}</li>
    </ul>
  </div>
);

Comment.propTypes
  = { comment: PropTypes.objectOf(PropTypes.any).isRequired };

export default Comment;
