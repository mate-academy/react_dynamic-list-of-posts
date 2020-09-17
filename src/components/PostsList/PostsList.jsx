import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './PostsList.scss';
import { getUserPosts } from '../../api/posts';

export const PostsList = ({ userId, selectedPostId, setSelectedPostId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getUserPosts(userId)
      .then(setPosts);
  }, [userId]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => (
          <li key={post.id} className="PostsList__item">
            <div>
              <b>
                {`[User #${post.userId}]:`}
                {' '}
              </b>
              {post.title}
            </div>
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => {
                (selectedPostId === post.id)
                  ? setSelectedPostId(0)
                  : setSelectedPostId(post.id);
              }}
            >
              {(post.id === selectedPostId)
                ? 'Close'
                : 'Open'
              }
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

PostsList.propTypes = {
  userId: PropTypes.number.isRequired,
  selectedPostId: PropTypes.number.isRequired,
  setSelectedPostId: PropTypes.func.isRequired,
};
