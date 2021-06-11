import React from 'react';
import './PostsList.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const PostsList = ({ posts, selectedPost, selectedPostId }) => (
  <>
    <div className="PostsList">
      <h2>Posts:</h2>
      {posts !== [] ? (
        <ul className="PostsList__list">
          {posts.map(post => (
            <li
              className="PostsList__item"
              key={post.id}
            >
              <div>
                <b>{`User #${post.userId}: `}</b>
                {post.title}
              </div>

              <button
                type="button"
                className={classNames(
                  'PostsList__button',
                  'button',
                  { button_active: selectedPostId === post.id },
                )}
                onClick={() => selectedPost(post.id)}
              >
                {selectedPostId === post.id
                  ? 'Close'
                  : 'Open'
                }
              </button>
            </li>
          ))}
        </ul>
      )
        : (
          <h2>No posts in selected User</h2>)
        }
    </div>

  </>
);

PostsList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      userId: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  selectedPost: PropTypes.func.isRequired,
  selectedPostId: PropTypes.number.isRequired,
};
