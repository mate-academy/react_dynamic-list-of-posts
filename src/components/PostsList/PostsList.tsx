import React from 'react';

import './PostsList.scss';

import { Post } from '../../types/Post';

type Props = {
  posts: Post[];
  onSelectPostId: (id: number | null) => void;
  selectedPostId: number | null;
};

export const PostsList: React.FC<Props> = ({ posts, onSelectPostId, selectedPostId }) => (
  <div className="PostsList">
    <h2>Posts:</h2>

    <ul className="PostsList__list">
      {posts.map(post => (
        <li key={post.id} className="PostsList__item">
          <div>
            <b>{post.userId}</b>
            {' '}
            {post.title}
          </div>
          {selectedPostId !== post.id ? (
            <button
              onClick={() => onSelectPostId(post.id)}
              type="button"
              className="PostsList__button button"
            >
              Show
            </button>
          ) : (
            <button
              onClick={() => onSelectPostId(null)}
              type="button"
              className="PostsList__button button"
            >
              Hide
            </button>
          )}
        </li>
      ))}
    </ul>
  </div>
);
