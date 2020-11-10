import React from 'react';
import PropTypes from 'prop-types';
import './PostsList.scss';

export function PostsList({ posts, setPostId, selectedPostId }) {
  const buttonStatus = (postId) => {
    setPostId((current) => {
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
        {posts.map(post => (
          <li
            className="PostsList__item"
            key={post.id}
          >
            <div>
              <b>{`[User #${post.userId}]: `}</b>
              {post.body}
            </div>
            <button
              type="button"
              // value={post.id}
              className="PostsList__button button"
              onClick={() => buttonStatus(post.id)}
            >
              {selectedPostId === post.id ? `Close` : `Open`}
            </button>
          </li>
        ))}

        {/* <li className="PostsList__item">
          <div>
            <b>[User #1]: </b>
            sunt aut facere repellat provident occaecati excepturi optio
          </div>
          <button
            type="button"
            className="PostsList__button button"
          >
            Close
          </button>
        </li>

        <li className="PostsList__item">
          <div>
            <b>[User #2]: </b>
            et ea vero quia laudantium autem
          </div>

          <button
            type="button"
            className="PostsList__button button"
          >
            Open
          </button>
        </li> */}
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
  setPostId: PropTypes.func.isRequired,
  selectedPostId: PropTypes.number.isRequired,
};
