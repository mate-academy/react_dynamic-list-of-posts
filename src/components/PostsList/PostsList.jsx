import React from 'react';
import './PostsList.scss';

import classNames from 'classnames';
import PropTypes from 'prop-types';

import { Loader } from '../Loader';

export const PostsList = ({
  posts,
  onOpenPost,
  selectedPostId,
}) => (posts.length === 0 ? (<Loader />) : (
  <div className="PostsList">
    <h2>Posts:</h2>

    <ul className="PostsList__list">

      {posts.map(post => (
        <li
          key={post.id}
          className="PostsList__item"
        >
          <div>
            <b>
              [User #
              {post.userId}
              ]:
              {' '}
            </b>
            {post.title}
          </div>
          <button
            type="button"
            className={classNames({
              button: true,
              PostsList__button: true,
              'PostsList__button--selected': selectedPostId === post.id,
            })}
            onClick={() => onOpenPost(post.id)}
          >
            {selectedPostId === post.id ? 'Close' : 'Open'}
          </button>
        </li>
      ))}
    </ul>
  </div>
));

PostsList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      userId: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  onOpenPost: PropTypes.func.isRequired,
  selectedPostId: PropTypes.number.isRequired,
};
