import React from 'react';
import PropTypes from 'prop-types';
import './PostsList.scss';

export const PostsList = (
  { posts,
    handleClick,
    postIsOpened,
    activePostId },
) => (
  <div className="PostsList">
    <h2>Posts:</h2>

    <ul className="PostsList__list">
      {posts.map(post => (
        <li key={post.id} className="PostsList__item">
          <div>
            <b>{`[User #${post.userId}]`}</b>
            {post.title}
          </div>
          {postIsOpened && post.id === activePostId
            ? (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => handleClick(post.id, 'close')}
              >
                Close
              </button>
            )
            : (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => handleClick(post.id, 'open')}
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
  posts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  })),
  handleClick: PropTypes.func.isRequired,
  postIsOpened: PropTypes.bool.isRequired,
  activePostId: PropTypes.number.isRequired,
};

PostsList.defaultProps = {
  posts: [],
};
