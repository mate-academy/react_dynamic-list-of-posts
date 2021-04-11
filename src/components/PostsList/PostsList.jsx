import React from 'react';
import PropTypes from 'prop-types';
import './PostsList.scss';

export const PostsList = React.memo(
  ({ posts, onSelectPostDetail, selectedPost, onSelectPostTitle }) => (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => (
          <li
            key={post.id}
            className="PostsList__item"
          >
            <div>
              <b>{`[User #${post.userId}] :`}</b>
              {post.title}
            </div>
            <button
              type="button"
              className="PostsList__button button"
              onClick={(event) => {
                if (event.target.textContent === 'Close') {
                  onSelectPostDetail(null);

                  return;
                }

                onSelectPostDetail(post.id);
                onSelectPostTitle(post.title);
              }}
            >
              {selectedPost === post.id ? 'Close' : 'Open'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  ),
);

PostsList.propTypes = PropTypes.shape({
  posts: PropTypes.arrayOf({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
  onSelectPostDetail: PropTypes.func.isRequired,
  onSelectPostTitle: PropTypes.func.isRequired,
  selectedPost: PropTypes.number.isRequired,
}).isRequired;
