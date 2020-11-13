import React from 'react';
import PropTypes from 'prop-types';
import './PostsList.scss';

export const PostsList = ({
  posts,
  selectedPost,
  openPost,
  closePost,
  setSelectedPost,
}) => (
  <div className="PostsList">
    <h2>Posts:</h2>

    <ul className="PostsList__list">
      {posts.map(post => (
        <li key={post.id} className="PostsList__item">
          <div>
            <b>
              [User #
              {post.userId}
              ]:
              {' '}
            </b>
            {post.title}
          </div>

          {selectedPost === post.id
            ? (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => {
                  closePost(setSelectedPost);
                }}
              >
                Close
              </button>
            )
            : (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => {
                  openPost(setSelectedPost, post.id);
                }}
              >
                Open
              </button>
            )}
        </li>
      ))}
    </ul>
  </div>
);

PostsList.defaultProps = {
  posts: [],
  selectedPost: null,
};

PostsList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
  })),
  selectedPost: PropTypes.number,
  openPost: PropTypes.func.isRequired,
  closePost: PropTypes.func.isRequired,
  setSelectedPost: PropTypes.func.isRequired,
};
