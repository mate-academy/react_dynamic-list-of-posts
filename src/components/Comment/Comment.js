import React from 'react';
import PropTypes from 'prop-types';
import User from '../User/User';

function Comment({ comment }) {
  const { body } = comment;

  return (
    <>
      <User user={comment} />
      <p>{body}</p>
    </>
  );
}

Comment.propTypes = {
  comment: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    body: PropTypes.string,
  }).isRequired,
};

export default Comment;
