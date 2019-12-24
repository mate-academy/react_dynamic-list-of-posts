import React from 'react';
import PropTypes from 'prop-types';

export default function Comment(props) {
  return (
    <>
      <h4>{props.comment.name}</h4>
      <h4>{props.comment.email}</h4>
    </>
  );
}

Comment.propTypes = {
  comment: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};
