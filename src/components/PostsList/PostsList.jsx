import React from 'react';
import './PostsList.scss';
import PropTypes from 'prop-types';

export const PostsList = ({ posts, postId, selectPostId }) => (
  <div className="PostsList">
    <h2>Posts:</h2>

    <ul className="PostsList__list">
      {posts.map(post => (
        <li
          className="PostsList__item"
          key={post.id}
        >
          <div>
            <b>{`[User #${post.userId}]: `}</b>
            {post.title}
          </div>
          <button
            type="button"
            className="PostsList__button button"
            onClick={() => {
              if (postId === post.id) {
                selectPostId(0);

                return;
              }

              selectPostId(post.id);
            }}
          >
            {postId === post.id
              ? 'Сlose'
              : 'Open'
            }
          </button>
        </li>
      ))}
    </ul>
  </div>
);

PostsList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
    }),
  ).isRequired,
  selectPostId: PropTypes.func.isRequired,
  postId: PropTypes.number.isRequired,
};
