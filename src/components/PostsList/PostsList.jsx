import React from 'react';
import './PostsList.scss';

export const PostsList = ({ posts, selectedPostId, setSelectedPostId }) => {
  return (
    <div className="PostsList">
      <h2>Posts:</h2>
  
      <ul className="PostsList__list">
        {posts.map(post => (
          <li
            className="PostsList__item"
            key={post.id}
          >
            <div>
              <b>[User #{post.userId}]: </b>
              {post.body}
            </div>
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => {
                if (selectedPostId === null) {
                  return setSelectedPostId(post.id)
                }
                return setSelectedPostId(null);
              }}
            >
              {selectedPostId === post.id ? (
                'Close'
              ) : (
                'Open'
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}