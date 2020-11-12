import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './PostsList.scss';
import { Loader } from '../Loader/Loader';

export function PostsList({ posts, setPostId, selectedPostId }) {
  const [loader, setLoader] = useState(true);

  const buttonStatus = (postId) => {
    setPostId((current) => {
      if (current === postId) {
        return '';
      }

      return postId;
    });
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>
      {loader
        ? <Loader />
        : (
          <ul className="PostsList__list">
            {posts.map(post => (
              <li
                className="PostsList__item"
                key={post.id}
              >
                <div>
                  <b>{`[User #${post.userId}]: `}</b>
                  {post.body}
                </div>
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => buttonStatus(post.id)}
                >
                  {selectedPostId === post.id ? `Close` : `Open`}
                </button>
              </li>
            ))}
          </ul>
        )}
      <ul className="PostsList__list">
        {posts.map(post => (
          <li
            className="PostsList__item"
            key={post.id}
          >
            <div>
              <b>{`[User #${post.userId}]: `}</b>
              {post.body}
            </div>
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => buttonStatus(post.id)}
            >
              {selectedPostId === post.id ? `Close` : `Open`}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

PostsList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      body: PropTypes.string.isRequired,
      userId: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  setPostId: PropTypes.func.isRequired,
  selectedPostId: PropTypes.number.isRequired,
};
