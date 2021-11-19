import React from 'react';

import './PostsList.scss';

interface Props {
  posts: Post[],
  selectPost: (value:number) => void,
  selectedPostId: number | null,
}

export const PostsList: React.FC<Props> = ({ posts, selectPost, selectedPostId }) => {
  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.length > 0 && posts.map(post => (
          <li
            key={post.id}
            className="PostsList__item"
          >
            <div>
              <b>
                User ID:
                {' '}
                {post.userId}
              </b>
              <p>{post.title}</p>
            </div>
            { selectedPostId === post.id ? (
              <button
                type="button"
                className="PostsList__button button is-success is-light"
                onClick={() => {
                  selectPost(0);
                }}
              >
                Close
              </button>
            ) : (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => {
                  selectPost(post.id);
                }}
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
