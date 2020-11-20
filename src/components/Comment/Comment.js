import React from 'react';
import PropTypes from 'prop-types';

export const Comment = ({ id, body, onClick }) => (
  <>
    <button
      type="button"
      className="PostDetails__remove-button button"
      onClick={() => onClick(id)}
    >
      X
    </button>

    <p>
      {body}
    </p>
  </>
);

Comment.propTypes = {
  id: PropTypes.number.isRequired,
  body: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
