import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './PostsList.scss';

export const PostsList = ({ posts, onSelect }) => {
  const [selectedPost, setSelectedPost] = useState(0);

  const showDetails = (postId) => {
    if (selectedPost === postId) {
      onSelect(0);
      setSelectedPost(0);

      return;
    }

    setSelectedPost(postId);
    onSelect(postId);
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map((post) => {
          const { userId, title, id } = post;

          return (
            <li key={id} className="PostsList__item">
              <div>
                <b>{`[User #${userId}]: `}</b>
                {title}
              </div>
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => showDetails(id)}
              >
                { id === selectedPost ? 'Close' : 'Open' }
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

PostsList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelect: PropTypes.func.isRequired,
};
