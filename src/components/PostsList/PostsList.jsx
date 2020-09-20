import React, { useState, useEffect } from 'react';
import * as api from '../../api/posts';
import { Loader } from '../Loader';
import './PostsList.scss';

export const PostsList = ({ userId, postId, setPostId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.getUserPosts(userId)
      .then(setPosts);
  }, [userId]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>
      {!posts && (
        <Loader />
      )}

      <ul className="PostsList__list">
        {posts.map(post => (
          <li
            className="PostsList__item"
            key={post.id}
          >
            <div>
              <b>
                User #
                {post.userId}
                {' '}
              </b>
              {post.title}
            </div>
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => (
                postId === post.id ? setPostId(0) : setPostId(post.id)
              )}
            >
              {postId === post.id ? 'Close' : 'Open'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
