import React from 'react';
import propTypes from 'prop-types';
import './PostsList.scss';

export const PostsList = ({ posts, selectedPostId, setSelectedPostId }) => {
  const handleClick = (id) => {
    selectedPostId === id
      ? setSelectedPostId(0)
      : setSelectedPostId(id);
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => (
          <li key={post.id} className="PostsList__item">
            <div>
              <b>
                {`[User #${post.userId}]: `}
              </b>
              {post.title}
            </div>
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => handleClick(post.id)}
            >
              {selectedPostId === post.id
                ? 'Close'
                : 'Open'
              }
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

PostsList.propTypes = {
  posts: propTypes.arrayOf(propTypes.shape({
    id: propTypes.number.isRequired,
    userId: propTypes.number.isRequired,
    title: propTypes.string.isRequired,
  })).isRequired,
  selectedPostId: propTypes.func.isRequired,
  setSelectedPostId: propTypes.func.isRequired,
};
