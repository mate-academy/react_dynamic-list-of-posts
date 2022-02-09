import React from 'react';
import './PostsList.scss';

type Props = {
  posts: Post[],
  handlePostId: (postId: number) => void,
  selectedPostId: number,
};

export const PostsList: React.FC<Props> = ({ posts, selectedPostId, handlePostId }) => (
  <div className="PostsList">
    <h2>Posts:</h2>
    <ul className="PostsList__list">
      {posts.map(post => (
        <li key={post.id} className="PostsList__item">
          <div>
            <b>{`[User #${post.userId}]: `}</b>
            {post.title}
          </div>
          <button
            type="button"
            className="PostsList__button button"
            onClick={() => handlePostId(post.id)}
          >
            {post.id === selectedPostId ? 'Close' : 'Open'}
          </button>
        </li>
      ))}
    </ul>
  </div>
);
