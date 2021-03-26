import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './PostsList.scss';
import { getUserPosts } from '../../api/posts';

export const PostsList = ({
  select,
  setSelectedPostId,
  selectedPostId,
}) => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    getUserPosts()
      .then(result => setPosts(result));
  }, []);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts && posts.filter(post => (
          select === '0' ? post : +post.userId === +select
        )).map(post => (
          <li key={post.id} className="PostsList__item">
            <div>
              <b>{`[User: #${post.userId}] `}</b>
              {post.title}
            </div>
            {selectedPostId === post.id ? (
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
};

PostsList.propTypes = {
  select: PropTypes.string.isRequired,
  setSelectedPostId: PropTypes.func.isRequired,
  selectedPostId: PropTypes.number,
};

PostsList.defaultProps = {
  selectedPostId: '',
};
