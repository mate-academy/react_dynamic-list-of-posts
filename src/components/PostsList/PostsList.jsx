import React from 'react';
import PropTypes from 'prop-types';
import './PostsList.scss';

export function PostsList({ selectedPostId, posts, setSelectedPostId }) {
  const buttonStatus = (postId) => {
    setSelectedPostId((current) => {
      if (current === postId) {
        return '';
      }

      return postId;
    });
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>
      <ul className="PostsList__list">
        {posts.length > 0 && posts.map(post => ( // posts.length > 0 adedd
          <li className="PostsList__item" key={post.id}>
            <div>
              <b>
                {`[User #${post.userId}]:`}
              </b>
              {post.body}
            </div>
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => buttonStatus(post.id)}
            >
              {selectedPostId === post.Id ? 'Open' : 'Close'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

PostsList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      body: PropTypes.string.isRequired,
      userId: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  selectedPostId: PropTypes.number.isRequired,
  setSelectedPostId: PropTypes.func.isRequired,
}.isRequired;
