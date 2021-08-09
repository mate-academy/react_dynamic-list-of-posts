import React from 'react';
import PropTypes from 'prop-types';
import './PostsList.scss';

export const PostsList = ({ posts, selectedPostId, selectPost }) => (
  <div className="PostsList">
    <h2>Posts:</h2>

    <ul className="PostsList__list">
      {posts.map(post => (
        <li
          className="PostsList__item"
          key={post.id}
        >
          <div>
            <b>
              {`[User #${post.userId}]:`}
            </b>
            {post.body}
          </div>
          {selectedPostId === post.id ? (
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => selectPost(0)}
            >
              Close
            </button>
          )
            : (
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

PostsList.propTypes = {
  posts: PropTypes.arrayOf({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
  selectedPostId: PropTypes.number.isRequired,
  selectPost: PropTypes.func.isRequired,
};
