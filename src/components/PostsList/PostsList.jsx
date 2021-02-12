import React, { useState } from 'react';
import './PostsList.scss';
// import { PostItem } from './PostItem/PostItem';

export const PostsList = ({ posts, selectPost, selectedPostId }) => {
  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => (
          <li key={post.id} className="PostsList__item">
            <div>
              <b>[User # {post.userId}]:</b>
              {post.title}
            </div>
            {selectedPostId === post.id ? (
              <button
                onClick={() => {
                  selectPost(0);
                }}
                type="button"
                className="PostsList__button button"
              >
                Close

              </button>
            ) : (
              <button
                onClick={() => {
                  selectPost(post.id);
                }}
                type="button"
                className="PostsList__button button"
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
