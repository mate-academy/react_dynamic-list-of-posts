import React from 'react';
import PropTypes from 'prop-types';
import './PostsList.scss';
import { Loader } from '../Loader/Loader';

export const PostsList = ({ posts, selectedPost, selectPost }) => {
  const handleClick = (postId) => {
    selectedPost === postId ? selectPost(0) : selectPost(postId);
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>
      {!posts
        ? <Loader /> : null
      }
      <ul className="PostsList__list">
        {posts.map(elem => (
          <li
            className="PostsList__item"
            key={elem.id}
          >
            <div>
              <b>{`[User #${elem.userId}]: `}</b>
              {elem.title}
            </div>
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => handleClick(elem.id)}
            >
              {selectedPost === elem.id ? 'Close' : 'Open'}
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
