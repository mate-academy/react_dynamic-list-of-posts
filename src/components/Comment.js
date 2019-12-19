import React from 'react';
import PropTypes from 'prop-types';

const Comment = ({ name, email, body }) => (
  <div className="comment">
    <h3 className="comment__title">{`Comment: ${name}`}</h3>
    <p className="comment__content">{body}</p>
    <p className="comment__user-email">{email}</p>
  </div>
);

Comment.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  body: PropTypes.string,
};

Comment.defaultProps = {
  name: 'Without title',
  email: null,
  body: 'Hidden comment',
};

export default Comment;
