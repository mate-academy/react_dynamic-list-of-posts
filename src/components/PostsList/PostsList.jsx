import React from 'react';
import './PostsList.scss';

import PropTypes from 'prop-types';
import classNames from 'classnames';

export const PostsList = ({
  posts,
  selectedPostId,
  setSelectPost,
}) => (
  <div className="PostsList">
    <h2>Posts:</h2>

    {posts.length !== 0 ? (
      <ul className="PostsList__list">
        {posts.map(post => (
          <li className="PostsList__item" key={post.id}>
            <div>
              <b>{`[User #${post.userId}]: `}</b>
              {post.title}
            </div>
            <button
              type="button"
              className={classNames({
                PostList__button: true,
                button: true,
                button_active: selectedPostId === post.id,
              })}
              onClick={() => {
                setSelectPost(post.id);
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
    ) : (
      'No user posts'
    )}
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
  selectedPostId: PropTypes.number.isRequired,
  setSelectPost: PropTypes.func.isRequired,
};
