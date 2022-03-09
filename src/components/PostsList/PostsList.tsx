import React from 'react';
import { Post } from '../../types/Post';
import { SelectedPostId } from '../../types/SelectedPostId';

import './PostsList.scss';

type Props = {
  posts: Post[]
  selectedPostId: SelectedPostId
  setSelectedPostId: React.Dispatch<React.SetStateAction<SelectedPostId>>
};

export const PostsList: React.FC<Props> = (
  {
    posts,
    selectedPostId,
    setSelectedPostId,
  },
) => (
  <div className="PostsList">
    <h2>Posts:</h2>

    <ul className="PostsList__list">
      {posts.map(post => (
        <li className="PostsList__item" key={post.id}>
          <div>
            <b>{`[User #${post.userId}]: `}</b>
            {post.title}
          </div>
          {post.id === selectedPostId ? (
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => setSelectedPostId(null)}
            >
              Close
            </button>
          ) : (
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => setSelectedPostId(post.id)}
            >
              Open
            </button>
          )}
        </li>
      ))}
    </ul>
  </div>
);
