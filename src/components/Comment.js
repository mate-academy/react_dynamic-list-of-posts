import React from 'react';
import PropTypes from 'prop-types';

const Comment = ({ commentItem }) => (
  <div className="comment">
    <p className="comment__body">{commentItem.body}</p>
    <div className="comment__name-email">
      <span>{commentItem.name}</span>
      <span>{commentItem.email}</span>
    </div>
  </div>
);

Comment.propTypes = {
  commentItem: PropTypes.shape({
    body: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};

export default Comment;
