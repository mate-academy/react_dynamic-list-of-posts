import React from 'react';
import PropTypes from 'prop-types';

export const Post = ({ post, handlePostId, isOpen }) => {
  const {
    userId,
    title,
    id,
  } = post;

  const handleOpen = (event) => {
    const { value } = event.target;

    handlePostId(value, isOpen);
  };

  return (
    <li className="PostsList__item">
      <div>
        <b>
          [User: #
          {userId}
          {' '}
          ]:
          {' '}
        </b>
        <strong>
          {title}
        </strong>
      </div>
      <button
        type="button"
        value={id}
        className="PostsList__button button"
        onClick={handleOpen}
      >
        {isOpen ? 'Close' : 'Open'}
      </button>
    </li>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  handlePostId: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};
