import React from 'react';
import './PostsList.scss';

import { PostsListTypes } from './PostsListTypes';

export const PostsList = ({ postsList, selectedPostId, setSelectedPostId }) => (
  <div className="PostsList">
    <h2>Posts:</h2>

    <ul className="PostsList__list">
      {postsList.map(post => (
        <li key={post.id} className="PostsList__item">
          <div>
            <b>{`[User #${post.userId}]: `}</b>
            {post.title}
          </div>
          {selectedPostId === post.id
            ? (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => setSelectedPostId(0)}
              >
                Close
              </button>
            )
            : (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => setSelectedPostId(post.id)}
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

PostsList.propTypes = PostsListTypes;
