import React from 'react';
import PropTypes from 'prop-types';
import './PostsList.scss';

export const PostsList = ({
  posts,
  setSelectedPost,
  selectedPost,
}) => (
  <div className="PostsList">
    <h2>Posts:</h2>
    <ul className="PostsList__list">
      {posts.map(post => (
        <li className="PostsList__item" key={post.id}>
          <div>
            <b>
              {`[User #${post.userId}]:`}
            </b>
            {post.title}
          </div>
          <button
            type="button"
            className="PostsList__button button"
            onClick={() => {
              if (selectedPost !== post.id) {
                setSelectedPost(post.id);
              } else {
                setSelectedPost(0);
              }
            }}
          >
            {selectedPost === post.id ? 'Close' : 'Open'}
          </button>
        </li>
      ))}
    </ul>
  </div>
);

PostsList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    userId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  })).isRequired,
  setSelectedPost: PropTypes.func.isRequired,
  selectedPost: PropTypes.number.isRequired,
};
