import React from 'react';
import './PostsList.scss';
import PropTypes from 'prop-types';

export const PostsList = ({ posts, selectedPostId, selectPost }) => (
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
              [User #
              {post.userId}
              ]:
              {' '}
            </b>
            {post.title}
          </div>
          {selectedPostId === post.id ? (
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => selectPost(0)}
            >
              Close
            </button>
          ) : (
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => selectPost(post.id)}
            >
              Open
            </button>
          )}
        </li>
      ))}
    </ul>
  </div>
);

PostsList.defaultProps = {
  posts: [],
};

PostsList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      userId: PropTypes.number,
      title: PropTypes.string,
    }),

  ),
  selectedPostId: PropTypes.number.isRequired,
  selectPost: PropTypes.func.isRequired,
};
