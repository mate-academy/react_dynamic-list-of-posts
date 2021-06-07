import React from 'react';
import PropTypes from 'prop-types';
import './PostsList.scss';

export const PostsList = ({ posts, postSelect, selectedPostId }) => (
  <div className="PostsList">
    <h2>Posts:</h2>

    <ul className="PostsList__list">

      {posts.map(post => (
        <li key={post.id} className="PostsList__item">
          <div>
            <b>
              {`[User #${post.userId}]: `}
            </b>
            {post.title}
          </div>
          <button
            type="button"
            className={
              `PostsList__button button 
              ${selectedPostId === post.id && 'PostsList__active'}`
            }
            onClick={() => {
              postSelect(post.id);
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
);

PostsList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape().isRequired,
  ).isRequired,
  postSelect: PropTypes.func.isRequired,
  selectedPostId: PropTypes.number.isRequired,
};
