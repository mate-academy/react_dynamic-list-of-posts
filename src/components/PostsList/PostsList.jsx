import React from 'react';
import PropTypes from 'prop-types';
import { Loader } from '../Loader';
import './PostsList.scss';

export const PostsList = ({ postId, setPostId, posts }) => (
  <div className="PostsList">
    <h2>Posts:</h2>
    {!posts && (
      <Loader />
    )}

    <ul className="PostsList__list">
      {posts.map(post => (
        <li
          className="PostsList__item"
          key={post.id}
        >
          <div>
            <b>
              User #
              {post.userId}
              {' '}
            </b>
            {post.title}
          </div>
          <button
            type="button"
            className="PostsList__button button"
            onClick={() => (
              postId === post.id ? setPostId(0) : setPostId(post.id)
            )}
          >
            {postId === post.id ? 'Close' : 'Open'}
          </button>
        </li>
      ))}
    </ul>
  </div>
);

PostsList.propTypes = {
  postId: PropTypes.number.isRequired,
  setPostId: PropTypes.func.isRequired,
  posts: PropTypes.arrayOf().isRequired,
};
