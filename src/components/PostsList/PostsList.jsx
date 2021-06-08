import React from 'react';
import PropTypes from 'prop-types';

import './PostsList.scss';

export const PostsList = ({ posts, onSelectedPostId, selectedPostId }) => (
  <div className="PostsList">
    <h2>Posts:</h2>

    <ul className="PostsList__list">
      {posts.map(post => (
        <li key={post.id} className="PostsList__item">
          <div>
            <b>[User #{post.userId}]: </b>
            {post.title}
          </div>
          <button
            type="button"
            className="PostsList__button button"
            onClick={() => onSelectedPostId(post.id)}
          >
            {(selectedPostId !== post.id) 
              ? 'Open'
              : 'Close'
            }
          </button>
        </li>
      ))}
    </ul>
  </div>
);

PostsList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelectedPostId: PropTypes.func.isRequired,
  selectedPostId: PropTypes.number.isRequired,
};
