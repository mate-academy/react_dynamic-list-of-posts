import React from 'react';
import PropTypes from 'prop-types';
import './PostsList.scss';

export const PostsList = ({ posts, isPostSelected, onPostSelect }) => (
  <div className="PostsList">
    <h2>Posts:</h2>

    <ul className="PostsList__list">
      {posts.map(post => (
        <li key={post.id} className="PostsList__item">
          <div>
            <b>
              {`[User ${post.userId}]: `}
            </b>
            {post.title}
          </div>
          {isPostSelected(post.id)
            ? (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => onPostSelect()}
              >
                Close
              </button>
            )
            : (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => onPostSelect(post.id)}
              >
                Open
              </button>
            )
          }
        </li>
      ))}
    </ul>
  </div>
);

PostsList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number,
    title: PropTypes.string.isRequired,
  })).isRequired,
  isPostSelected: PropTypes.func.isRequired,
  onPostSelect: PropTypes.func.isRequired,
};
