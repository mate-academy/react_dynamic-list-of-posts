import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './PostsList.scss';

import { getUserPosts } from '../../api/posts';

export const PostsList = ({ userId, postId, setPostId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getUserPosts(userId)
      .then(setPosts);
  }, [userId]);

  const handleClick = (openPostId) => {
    if (postId === openPostId) {
      setPostId(0);
    } else {
      setPostId(openPostId);
    }
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => (

          <li
            key={post.id}
            className="PostsList__item"
          >
            <div>
              <b>
                {`[User #${post.userId}]: `}
              </b>
              {post.title}
            </div>
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => handleClick(post.id)}
            >
              {(postId === post.id) ? 'Close' : 'Open'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

PostsList.propTypes = {
  userId: PropTypes.number.isRequired,
  postId: PropTypes.number.isRequired,
  setPostId: PropTypes.func.isRequired,
};
