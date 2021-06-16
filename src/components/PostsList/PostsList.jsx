import React from 'react';
import './PostsList.scss';
import PropTypes from 'prop-types';

export const PostsList = ({
  posts,
  onClickSelectPost,
  postId,
}) => (
  <div className="PostsList">
    <h2>Posts:</h2>

    <ul className="PostsList__list">
      {posts.map(post => (
        <li className="PostsList__item" key={post.id}>
          <div>
            <b>
              [User #
              {post.userId}
              ]:
              {' '}
            </b>
            {post.title}
          </div>
          <button
            type="button"
            className="PostsList__button button"
            onClick={() => onClickSelectPost(post.id)}
          >
            {post.id === postId ? 'Close' : 'Open'}
          </button>
        </li>
      ))}
    </ul>
  </div>
);

PostsList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      userId: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  onClickSelectPost: PropTypes.func.isRequired,
  postId: PropTypes.number.isRequired,
};
