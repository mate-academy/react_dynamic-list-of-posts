import React from 'react';
import PropTypes from 'prop-types';

export const Comment = ({ comment, remove }) => {
  const handleClickRemove = () => remove(comment.id);

  return (
    <>
      <li className="PostDetails__list-item">
        <button
          type="button"
          className="PostDetails__remove-button button"
          onClick={handleClickRemove}
        >
          X
        </button>
      </li>
    </>
  );
};

Comment.propTypes = {
  remove: PropTypes.func.isRequired,
  comment: PropTypes.shape({
    id: PropTypes.number,
    body: PropTypes.string.isRequired,
  }).isRequired,
};
