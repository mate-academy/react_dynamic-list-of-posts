import React from 'react';
import PropTypes from 'prop-types';

export const Comment = ({ comment }) => (
  // console.log(comment);

  // return (
  <>
    <button
      type="button"
      className="PostDetails__remove-button button"
    >
      X
    </button>
    <p>{comment.id}</p>
  </>
);
// };

Comment.propTypes = {
  comment: PropTypes.string.isRequired,
};
