import React, { useState, useEffect } from 'react';
import './PostsList.scss';
import { getAllPosts } from '../../api/posts';

export const PostsList = ({ posts }) => {

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => (
          <li className="PostsList__item">
            <div>
              <b>
                {`User #${post.userId}:`}
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
