import React from 'react';
import './PostsList.scss';

export const PostsList = ({ postsFromServer, onSetPost, selectedPostId }) => {

  return (
    <div className="PostsList">
      <h2>Posts:</h2>
  
      <ul className="PostsList__list">
        {postsFromServer.map(post => (
          <li
            className="PostsList__item"
            key={post.id}
          >
            <div>
              <b>[User #{post.userId}]: </b>
              {post.title}
            </div>
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => {
                if (selectedPostId === 0) {
                  return onSetPost(post.id);
                }

                return onSetPost(0);
              }}
            >
              {selectedPostId === post.id ? 'Close' : 'Open'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
