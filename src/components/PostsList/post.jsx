import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const Post = ({ post, handlePostId, selectedPostId }) => {
  const {
    userId,
    title,
    id,
  } = post;

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (event) => {
    const { value } = event.target;

    setIsOpen(!isOpen);
    handlePostId(value, isOpen);
  };

  useEffect(() => {
    // if (isOpen) {
    //   setIsOpen(false);
    // }
  }, [selectedPostId]);

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
  selectedPostId: PropTypes.string.isRequired,
};
