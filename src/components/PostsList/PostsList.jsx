import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './PostsList.scss';

export const PostsList = ({ posts, setSelectPost, selectedPostId }) => (
  <div className="PostsList">
    <h2>Posts:</h2>

    <ul className="PostsList__list">
      {posts.map(post => (
        <li className="PostsList__item" key={post.id}>
          <div>
            <b>
              {`User #${post.userId}: `}
            </b>
            {post.title}
          </div>
          <button
            type="button"
            className={classNames(
              'PostsList__button',
              'button',
              { 'button--active': selectedPostId === post.id },
            )}
            onClick={() => (selectedPostId === post.id
              ? setSelectPost(0)
              : setSelectPost(post.id)
            )}
          >
            {selectedPostId === post.id ? 'Close' : 'Open'}
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
      title: PropTypes.string.isRequired,
      userId: PropTypes.number.isRequired,
    }),
  ).isRequired,
  setSelectPost: PropTypes.func.isRequired,
  selectedPostId: PropTypes.number.isRequired,
};
