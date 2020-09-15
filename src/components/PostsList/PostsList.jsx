import React from 'react';
import PropTypes from 'prop-types';
import './PostsList.scss';

export const PostsList = ({
  posts,
  selectedPostId,
  selectPost,
  setSelectedPostId,
}) => (
  <div className="PostsList">
    <h2>Posts:</h2>

    <ul className="PostsList__list">
      {posts.map(post => (
        <li className="PostsList__item" key={post.id}>
          <div>
            <b>{`[User #${post.userId}]: `}</b>
            {post.title}
          </div>
          <button
            type="button"
            className="PostsList__button button"
            onClick={() => {
              selectPost(post.id);
              if (selectedPostId === post.id) {
                setSelectedPostId(0);
              } else {
                setSelectedPostId(post.id);
              }
            }}
          >
            {(selectedPostId === post.id)
              ? 'Close'
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
      id: PropTypes.number.isRequired,
      userId: PropTypes.number.isRequired,
      body: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  selectedPostId: PropTypes.number.isRequired,
  selectPost: PropTypes.func.isRequired,
  setSelectedPostId: PropTypes.func.isRequired,
};
