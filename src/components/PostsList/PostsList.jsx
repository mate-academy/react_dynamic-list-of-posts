import React, { useState } from 'react';
import './PostsList.scss';

export const PostsList = ({ userPosts, setSelectedPostId, selectedPostId }) => (
  <div className="PostsList">
    <h2>Posts:</h2>

    <ul className="PostsList__list">
      {userPosts.map(post => (
        <li
          className="PostsList__item"
          key={post.id}
        >
          <div>
            <b>{`[User ${post.userId}]: `}</b>
            {post.title}
          </div>
          <button
            type="button"
            className="PostsList__button button"
            onClick={() => {
              setSelectedPostId(post.id);
            }}
          >
            {selectedPostId === post.id
              ? 'Open'
              : 'Close'
              }
          </button>
        </li>
      ))}
    </ul>
  </div>
);
