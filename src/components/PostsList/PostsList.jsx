import React, { useState, useEffect } from 'react';
import './PostsList.scss';
import PropTypes from 'prop-types';
import { getUserPosts } from '../../api/posts';

export const PostsList = ({ userId, selectedPostId, setSelectedPostId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getUserPosts(userId)
      .then(userPosts => setPosts(userPosts));
  }, [userId]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => (
          <li key={post.id} className="PostsList__item">
            <div>
              <b>{`[User #${post.userId}]: `}</b>
              {post.title}
            </div>

            {selectedPostId === post.id && (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => setSelectedPostId(0)}
              >
                Close
              </button>
            )}

            {selectedPostId !== post.id && (
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
};

PostsList.propTypes = {
  userId: PropTypes.string.isRequired,
  selectedPostId: PropTypes.number.isRequired,
  setSelectedPostId: PropTypes.func.isRequired,
};
