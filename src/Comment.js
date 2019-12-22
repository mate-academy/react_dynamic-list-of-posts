import PropTypes from 'prop-types';
import React from 'react';

const Comment = ({ comment: { name, body, email } }) => (
  <div className="comment">
    <h3 className="comment-name">{name}</h3>
    <p className="comment-body">{body}</p>
    <p className="comment-email">
      <span>By </span>
      {email}
    </p>
  </div>
);

Comment.propTypes
  = { comment: PropTypes.oneOfType([PropTypes.object]).isRequired };

export default Comment;
