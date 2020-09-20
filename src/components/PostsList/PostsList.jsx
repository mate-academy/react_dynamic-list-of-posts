import React from 'react';
import PropTypes from 'prop-types';
import './PostsList.scss';

export const PostsList = ({
  posts,
  closePost,
  selectedPostId,
  postSelection,
}) => (
  <div className="PostsList">
    <h2>
      Posts:
      {posts.length}
    </h2>

    <ul className="PostsList__list">
      {posts.map(post => (
        <li className="PostsList__item" key={post.id}>
          <div>
            <b>
              [User #
              {post.userId}
              ]:
            </b>
            {post.title}
          </div>
          {post.id !== selectedPostId && (
            <button
              type="submit"
              className="PostsList__button button"
              onClick={() => {
                postSelection(post.id);
              }}
            >
              Open
            </button>
          )}
          {post.id === selectedPostId && (
            <button
              type="submit"
              className="PostsList__button button"
              onClick={closePost}
            >
              Close
            </button>
          )}
        </li>
      ))}
    </ul>
  </div>
);

PostsList.defaultProps = {
  posts: [],
};

PostsList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
  })),
  closePost: PropTypes.func.isRequired,
  selectedPostId: PropTypes.number.isRequired,
  postSelection: PropTypes.func.isRequired,
};
