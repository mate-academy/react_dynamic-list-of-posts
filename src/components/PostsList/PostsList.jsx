import React from 'react';
import './PostsList.scss';
import PropTypes from 'prop-types';

export const PostsList = React.memo(
  ({ filterPosts, selectUserId, userId }) => (
    <div className="PostsList">
      <h2>{`Posts: ${filterPosts.length}`}</h2>

      <ul className="PostsList__list">
        {filterPosts.map(post => (
          <li
            className="PostsList__item"
            key={post.id}
          >
            <div>
              <b>
                {`[User: ${post.userId}]`}
                {' '}
              </b>
              {post.title}
            </div>
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => {
                selectUserId(post.id === userId ? 0 : post.id, post);
              }}
            >
              {(userId === post.id) ? 'Close' : 'Open'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  ),
);

PostsList.propTypes = {
  filterPosts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string || null.isRequired,
    userId: PropTypes.number.isRequired,
  })).isRequired,
  selectUserId: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
};
