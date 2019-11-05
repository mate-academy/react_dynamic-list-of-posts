import React from 'react';
import PropTypes from 'prop-types';

function Comment({ body, email }) {
  return (
    <>
      {body}
      <br />
      {email}
    </>
  );
}

Comment.propTypes = {
  body: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default Comment;
