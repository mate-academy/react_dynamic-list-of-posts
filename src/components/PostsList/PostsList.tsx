import React from 'react';
import { Post } from '../../types/Post';
import './PostsList.scss';

type Props = {
  posts: Post[];
  setpostId: (id: number) => void;
  postId: number;
};

export const PostsList: React.FC<Props> = ({ posts, setpostId, postId }) => {
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
                {`[User №${post.userId}]:`}
              </b>
              {post.title}
            </div>
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => setpostId(post.id === postId ? 0 : post.id)}
            >
              {post.id === postId ? 'Close' : 'Open'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
