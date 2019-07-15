import React from 'react';
import PropTypes from 'prop-types';

const Comment = ({ commentItem }) => (
  <div className="comment">
    <p className="comment__body">{commentItem.body}</p>
    <ul className="user">
      <li>{commentItem.name}</li>
      <li>{commentItem.email}</li>
    </ul>
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
