/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import './PostsList.scss';
import { GetUserPosts } from '../../api/posts';

export const PostsList = ({ userId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(async() => {
    setPosts(await GetUserPosts(userId));
  }, [userId]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => (
          <li className="PostsList__item">
            <div>
              <b>
                [User #
                {post.userId}
                ]:
                {' '}
              </b>
              {post.title}
            </div>
            <button
              type="button"
              className="PostsList__button button"
            >
              Open
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
