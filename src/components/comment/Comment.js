import React from 'react';
import PropTypes from 'prop-types';

function Comment({ comment: { name, body, email } }) {
  return (
    <>
      <h4>{name}</h4>
      <p>{email}</p>
      <p>{body}</p>
    </>
  );
}

Comment.propTypes = {
  comment: PropTypes.shape({
    body: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};

export default Comment;
