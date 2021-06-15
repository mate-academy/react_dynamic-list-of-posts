import React from 'react';
import PropTypes from 'prop-types';

import './PostsList.scss';

export const PostsList = ({
  posts,
  postId,
  onSelectPost,
}) => (
  <div className="PostsList">
    <h2>Posts:</h2>

    <ul className="PostsList__list">
      {posts.map(({ id, userId, title }) => (
        <li className="PostsList__item" key={id}>
          <div>
            <b>
              [User #
              {userId}
              ]:
              {' '}
            </b>
            {title}
          </div>

          {postId === id ? (
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => onSelectPost(0)}
            >
              Closse
            </button>
          ) : (
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => onSelectPost(id)}
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
  posts: PropTypes.arrayOf(PropTypes.shape).isRequired,
  postId: PropTypes.number.isRequired,
  onSelectPost: PropTypes.func.isRequired,
};
