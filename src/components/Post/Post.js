import React from 'react';
import PropTypes from 'prop-types';

export const Post = ({ id, title, userId, selectedPostId, handleClick }) => (
  <>
    <div>
      <b>{`[User #${userId}]:`}</b>
      {title}
    </div>

    <button
      type="button"
      className="PostsList__button button"
      onClick={() => handleClick(id)}
    >
      {selectedPostId === id
        ? 'Close'
        : 'Open'
      }
    </button>
  </>
);

Post.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  userId: PropTypes.number,
  selectedPostId: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
};

Post.defaultProps = {
  userId: 0,
};
