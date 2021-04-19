import React from 'react';
import './PostsList.scss';
import PropTypes from 'prop-types';

export const PostsList = ({ posts, selectPost, selectedPost }) => (
  <div className="PostsList">
    <h2>Posts:</h2>

    <ul className="PostsList__list">
      {posts
        .map(post => (
          <li
            key={post.id}
            className="PostsList__item"
          >
            <div>
              <b>{`[User #${post.userId}]: `}</b>
              {post.title}
            </div>
            {selectedPost !== post.id
              ? (
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => selectPost(post.id)}
                >
                  Open
                </button>
              )
              : (
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => selectPost()}
                >
                  Close
                </button>
              )
            }
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
    }),
  ).isRequired,
  selectPost: PropTypes.func.isRequired,
  selectedPost: PropTypes.number.isRequired,
};
