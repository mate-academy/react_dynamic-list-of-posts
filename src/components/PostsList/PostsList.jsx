import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './PostsList.scss';
import { Loader } from '../Loader';

export const PostsList = ({
  posts,
  selectedPostId,
  selectPost,
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
              className={classNames(
                'PostsList__button',
                'button',
                { button_active: selectedPostId === post.id },
              )}
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
    ) : (
      <Loader />
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
  selectPost: PropTypes.func.isRequired,
};
