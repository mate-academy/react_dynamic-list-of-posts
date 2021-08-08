import React from 'react';
import './PostsList.scss';

export const PostsList = ({ posts }) => (
  <div className="PostsList">
    <h2>Posts:</h2>

    <ul className="PostsList__list">
      {posts.map(post => (
        <li
          className="PostsList__item"
          key={post.id}
        >
          <div>
            <b>
              {`[User #${post.userId}]:`}
            </b>
            {post.body}
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
