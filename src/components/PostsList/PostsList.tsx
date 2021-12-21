import React from 'react';
import './PostsList.scss';
import { Post } from '../../types/Post';

type Props = {
  posts: Post[];
  selectedPostId: number;
  onSelect: (postId: number) => void;
};

export const PostsList: React.FC<Props> = ({ posts, selectedPostId, onSelect }) => {
  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => (
          <li key={post.id} className="PostsList__item">
            <div>
              <b>{`[User #${post.userId}]: `}</b>
              {post.title}
            </div>

            {selectedPostId === post.id ? (
              <button
                onClick={() => onSelect(0)}
                type="button"
                className="PostsList__button button"
              >
                Close
              </button>
            ) : (
              <button
                onClick={() => onSelect(post.id)}
                type="button"
                className="PostsList__button button"
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
