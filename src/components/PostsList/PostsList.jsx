import React from 'react';
import PropTypes from 'prop-types';
import './PostsList.scss';

export const PostsList = ({ posts, selectedPostId, selectPost }) => (
  <div className="PostsList">
    <h2>Posts:</h2>

    <ul className="PostsList__list">
      {posts.map(post => (
        <li key={post.id} className="PostsList__item">
          <div>
            <b>
              [User #
              {post.userId}
              ]:
            </b>
            {post.title}
          </div>
          <button
            type="button"
            className="PostsList__button button"
            onClick={({ target }) => selectPost(post.id)}
          >
            {post.id === selectedPostId ? 'Close' : 'Open'}
          </button>
        </li>
      ))}
    </ul>
  </div>

);

PostsList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    userId: PropTypes.number,
    title: PropTypes.string,
    body: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
  })),
  selectedPostId: PropTypes.number.isRequired,
  selectPost: PropTypes.func.isRequired,
};

PostsList.defaultProps = {
  posts: [],
};
