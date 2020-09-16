import React from 'react';
import PropTypes from 'prop-types';
import './PostsList.scss';
import { Loader } from '../Loader/Loader';

export const PostsList = ({ posts, selectedPost, selectPost }) => {
  const onClick = (postId) => {
    if (selectedPost === postId) {
      selectPost(0);
    } else {
      selectPost(postId);
    }
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>
      {!posts && (
        <Loader />
      )}

      <ul className="PostsList__list">
        {posts.map(({ userId, title, id }) => (
          <li
            className="PostsList__item"
            key={id}
          >
            <div>
              <b>{`[User #${userId}] `}</b>
              {title}
            </div>
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => onClick(id)}
            >
              {selectedPost === id ? 'Close' : 'Open'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

PostsList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      userId: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  selectedPost: PropTypes.number.isRequired,
  selectPost: PropTypes.func.isRequired,
};
