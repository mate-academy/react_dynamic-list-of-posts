import React from 'react';
import PropTypes from 'prop-types';
import './PostsList.scss';

export const PostsList = ({
  posts,
  selectedPostId,
  setSelectedPostId,
}) => (
  <div className="PostsList">
    <h2>Posts:</h2>

    <ul className="PostsList__list">
      {posts.map(post => (
        <li key={post.id} className="PostsList__item">
          <div>
            <b>
              {`[User #${post.userId}]:`}
            </b>
            {post.title}
          </div>
          {selectedPostId === post.id
            ? (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => setSelectedPostId(0)}
              >
                Close
              </button>
            ) : (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => setSelectedPostId(post.id)}
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
  setSelectedPostId: PropTypes.func.isRequired,
  selectedPostId: PropTypes.number.isRequired,
  posts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
};
