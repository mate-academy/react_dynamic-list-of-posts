import React from 'react';
import PropTypes from 'prop-types';

export default function Comment({ comment }) {
  return (
    <>
      <li>{comment.name}</li>
      <li>{comment.email}</li>
    </>
  );
}

Comment.propTypes = {
  comment: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};
