import React from 'react';
import './PostsList.scss';
import PropTypes from 'prop-types';

export const PostsList = ({ posts, selectPostId, postId, onClose }) => (
  <div className="PostsList">
    <h2>Posts:</h2>

    <ul className="PostsList__list">
      {posts.map(post => (
        <li
          key={post.id}
          className="PostsList__item"
        >
          <div>
            <b>{`[User #${post.userId}]`}</b>
            {post.title}
          </div>
          {(postId !== post.id) ? (
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => selectPostId(post.id)}
            >
              Open
            </button>
          ) : (
            <button
              type="button"
              className="PostsList__button my-button"
              onClick={() => onClose()}
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
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectPostId: PropTypes.func.isRequired,
  postId: PropTypes.number,
  onClose: PropTypes.func.isRequired,
};

PostsList.defaultProps = {
  postId: -1,
};
