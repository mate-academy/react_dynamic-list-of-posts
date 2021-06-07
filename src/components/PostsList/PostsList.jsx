import React from 'react';
import './PostsList.scss';

export const PostsList = ({ posts, selectedPostId, onSelect }) => (
  <div className="PostsList">
    <h2>Posts:</h2>

    <ul className="PostsList__list">
      {posts.map(post => (
        <li
          key={post.id}
          className="PostsList__item"
        >
          <div>
            <b>
              [User #
              {post.userId}
              ]:
            </b>
            sunt aut facere repellat provident occaecati excepturi optio
          </div>
          {(selectedPostId === post.id)
            ? (
              <button
                type="button"
                className="PostsList__button button"
                style={{ backgroundColor: '#4d457b' }}
                onClick={() => onSelect(0)}
              >
                Close
              </button>
            )
            : (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => onSelect(post.id)}
              >
                Open
              </button>
            )
          }
        </li>
      ))}
    </ul>
  </div>
);
