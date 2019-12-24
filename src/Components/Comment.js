import React from 'react';
import PropTypes from 'prop-types';

const Comment = ({ name, email, body }) => (
  <div>
    <h3>{`Comment: ${name}`}</h3>
    <p>{body}</p>
    <p>{email}</p>
  </div>
);

Comment.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  body: PropTypes.string,
}.isRequired;

export default Comment;
