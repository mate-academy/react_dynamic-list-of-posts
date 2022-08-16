import React from 'react';
import { Post } from '../../types/Post';
import './PostsList.scss';

type Props = {
  posts: Post[];
  selectPostId: (postId: number) => void;
  selectedPostId: number | null;
};

export const PostsList: React.FC<Props> = (
  {
    posts,
    selectPostId,
    selectedPostId,
  },
) => {
  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list" data-cy="postDetails">
        {posts.map(post => (
          <li key={post.id} className="PostsList__item">
            <div>
              <b>{`[User #${post.userId}]: `}</b>
              {post.title}
            </div>

            <button
              type="button"
              className="PostsList__button button"
              onClick={() => selectPostId(post.id)}
            >
              {selectedPostId === post.id ? 'Close' : 'Open'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
