import React from 'react';
import PropTypes from 'prop-types';
import './PostsList.scss';

export const PostsList = ({ posts, postId, onPostIdSelect, onPostClose }) => (
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
              {`[User #${post.userId}]:`}
            </b>
            {post.title}
          </div>

          {post.id !== postId && (
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => onPostIdSelect(post.id)}
            >
              Open
            </button>
          )}

          {post.id === postId && (
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => onPostClose()}
            >
              Close
            </button>
          )}
        </li>
      ))}
    </ul>
  </div>
);

PostsList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
  postId: PropTypes.number.isRequired,
  onPostIdSelect: PropTypes.func.isRequired,
  onPostClose: PropTypes.func.isRequired,
};

PostsList.defaultProps = {
  posts: [],
};
