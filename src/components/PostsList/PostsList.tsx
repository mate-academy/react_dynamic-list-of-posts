import React from 'react';
import './PostsList.scss';
import { Post } from '../../types/types';

type Props = {
  posts: Post[];
  selectPost: (postId: number) => void;
  selectedId: number,
};

export const PostsList: React.FC<Props> = ({
  posts,
  selectPost,
  selectedId,
}) => {
  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => (
          <li
            key={post.id}
            className="PostsList__item"
          >
            <div>
              <b>
                {`[User # ${post.userId}]: `}
              </b>
              {post.title}
            </div>
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => {
                selectPost(post.id);
              }}
            >
              {post.id !== selectedId ? 'Open' : 'Close'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
