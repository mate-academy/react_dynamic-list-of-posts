import React from 'react';
import PropTypes from 'prop-types';

export function Post({
  post,
  setPostId,
  selectedPostId,
}) {
  const { id, userId, title } = post;
  const openPost = () => {
    setPostId(id);
  };

  const closePost = () => {
    setPostId(0);
  };

  return (
    <li key={id} className="PostsList__item">
      <div>
        <b>{`[User #${userId}]: `}</b>
        {title}
      </div>
      {id === selectedPostId ? (
        <button
          type="button"
          className="PostsList__button button"
          onClick={closePost}
        >
          Close
        </button>
      ) : (
        <button
          type="button"
          className="PostsList__button button"
          onClick={openPost}
        >
          Open
        </button>
      )}
    </li>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  setPostId: PropTypes.func.isRequired,
  selectedPostId: PropTypes.number.isRequired,
};
