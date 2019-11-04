import React from 'react';
import PropTypes from 'prop-types';

function Comment({comment:{name, body, email}}) {
  return (
    <p>
      <strong>{name}</strong> ({email}): <br />{body}
    </p>
  )
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
}

export default Comment;
