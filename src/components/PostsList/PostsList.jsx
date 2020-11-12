import React from 'react';
import PropTypes from 'prop-types';
import './PostsList.scss';

import { Loader } from '../Loader';

export const PostsList = ({ posts, selectPost, selectedPostId }) => (
  <>
    {!posts.length ? (
      <Loader />
    ) : (
      <div className="PostsList">
        <h2>Posts:</h2>
        <ul className="PostsList__list">
          {posts.map(post => (
            <li
              key={post.id}
              className="PostsList__item"
            >
              <div>
                <b>{`User #${post.userId}`}</b>
                <br />
                {post.title}
              </div>
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => {
                  selectPost(post.id);
                }}
              >
                {selectedPostId === post.id
                  ? 'Close'
                  : 'Open'
                }
              </button>
            </li>
          ))}
        </ul>
      </div>
    )}
  </>
);

PostsList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  selectedPostId: PropTypes.number.isRequired,
  selectPost: PropTypes.func.isRequired,
};
