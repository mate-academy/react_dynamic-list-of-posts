import React from 'react';
import './PostsList.scss';
import PropTypes, { shape } from 'prop-types';

export const PostsList = ({ posts, selectedPostId, onPostIdSelect }) => (
  <div className="PostsList">
    <h2>Posts:</h2>

    <ul className="PostsList__list">
      {posts && posts.map(post => (
        <li key={post.id} className="PostsList__item">
          <div>
            <b>{`[User #${post.userId}]: `}</b>
            {post.title}
          </div>
          <button
            type="button"
            className="PostsList__button button"
            onClick={() => onPostIdSelect(
              post.id === selectedPostId ? null : post.id,
            )}
          >
            {post.id === selectedPostId ? 'Close' : 'Open'}
          </button>
        </li>
      ))}
    </ul>
  </div>
);

PostsList.propTypes = {
  posts: PropTypes.arrayOf(
    shape({
      id: PropTypes.number.isRequired,
      userId: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  selectedPostId: PropTypes.number.isRequired,
  onPostIdSelect: PropTypes.func.isRequired,
};
