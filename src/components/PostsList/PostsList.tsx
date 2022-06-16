import React from 'react';
import { Post } from '../../types/Post';
import './PostsList.scss';

type Props = {
  posts: Post[] | null;
  selectPostId: (postid: number) => void;
  currentPostId: number;
};

export const PostsList: React.FC<Props> = ({
  posts,
  selectPostId,
  currentPostId,
}) => {
  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul data-cy="postDetails" className="PostsList__list">
        {posts && posts.map(post => (
          <li key={post.id} className="PostsList__item">
            <div>
              <b>{`User #${post.userId}: `}</b>
              {post.title}
            </div>
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => selectPostId(post.id)}
            >
              {currentPostId === post.id ? 'Close' : 'Open'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
