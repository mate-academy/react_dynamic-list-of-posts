import React from 'react';
import { Post } from '../../react-app-env';
import './PostsList.scss';

type Props = {
  posts: Post[]
  setSelectedPost: (post: number) => void
  selectedPostId: number
};

export const PostsList: React.FC<Props> = ({ posts, setSelectedPost, selectedPostId }) => {
  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => (
          <li
            className="PostsList__item"
            key={post.id}
          >
            <div>
              <b>{`[User #${post.userId}]:`}</b>
              {post.title}
            </div>
            {post.id === selectedPostId ? (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => setSelectedPost(0)}
              >
                Close
              </button>
            ) : (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => setSelectedPost(post.id)}
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
