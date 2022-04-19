import React from 'react';
import { Post } from '../../types';
import './PostsList.scss';

type Props = {
  posts: Post[];
  selectPost: (postId: number) => void;
  selectedPostId: number;
};

export const PostsList: React.FC<Props> = React.memo(({
  posts, selectPost, selectedPostId,
}) => {
  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map((post: Post) => (
          <li key={post.id} className="PostsList__item">
            <div>
              <b>{`[User #${post.userId}]: `}</b>
              {post.title}
            </div>
            <button
              type="button"
              className={`PostsList__button button ${
                selectedPostId === post.id
                  ? 'PostsList__button--is-active'
                  : ''
              }`}
              onClick={() => (
                selectedPostId === post.id
                  ? selectPost(0)
                  : selectPost(post.id)
              )}
            >
              {selectedPostId === post.id
                ? 'Close'
                : 'Open'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
});
