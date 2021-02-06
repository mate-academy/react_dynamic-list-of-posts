import React, { useState } from 'react';
import './PostsList.scss';
// import { PostItem } from './PostItem/PostItem';

export const PostsList = ({ posts, selectPost, selectedPostId }) => {
  // console.log(props.posts);

  const open = () => {
    // console.log('open');
  };
  const close = () => {
    // console.log('close');
  };

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
                  close();
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
                  open();
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
