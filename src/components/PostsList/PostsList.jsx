import React, { useState, useEffect } from 'react';
import './PostsList.scss';
import {getUserPosts} from "../../api/posts";

export const PostsList = ({ posts, selectPost, activeButton, toggleButton, selectedPostId}) => {

  const handleButton = (event, postId) => {
    if (activeButton && postId === selectedPostId ) {
      toggleButton(false);
      selectPost(0);

      return;
    }

    selectPost(postId);
    toggleButton(true);
  };


  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => (
          <li key={post.id} className="PostsList__item">
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
              onClick={event => handleButton(event, post.id)}
            >
              {activeButton && post.id === selectedPostId ? 'Close' : 'Open' }
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
