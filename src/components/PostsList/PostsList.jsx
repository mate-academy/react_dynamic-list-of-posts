import React from 'react';
import './PostsList.scss';

export const PostsList = ({
  posts,
  handleSelectedPost,
  selectedPostId
}) => (
  <div className="PostsList">
    <h2>Posts:</h2>

    <ul className="PostsList__list">
      {posts && posts.map(post => (
        <li
          key={post.id}
          className="PostsList__item"
        >
          <div>
            <b>
              {`[User: #${post.userId}]`}
            </b>
            {post.title}
          </div>
          {selectedPostId === post.id
            ? (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => handleSelectedPost(0)}
              >
                Close
              </button>
            )
            : (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => handleSelectedPost(post.id)}
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
