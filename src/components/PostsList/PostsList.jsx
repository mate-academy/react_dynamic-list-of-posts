import React from 'react';
import './PostsList.scss';
import PropTypes from 'prop-types';

export const PostsList = ({ posts, onSelect, selectedPostId }) => (
  <div className="PostsList">
    <h2>Posts:</h2>

    <ul className="PostsList__list">
      {posts.map(post => (
        <li
          key={post.id}
          className="PostsList__item"
        >
          <div>
            <b>
              {`[User #1]: ${post.userId}`}
            </b>
            {post.title}
          </div>
          {(selectedPostId === post.id) ? (
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => onSelect(0)}
            >
              Close
            </button>
          ) : (
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => onSelect(post.id)}
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
  selectedPostId: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      userId: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
