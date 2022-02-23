import React from 'react';
import './PostsList.scss';

type Props = {
  posts: Post[],
  selectedPostId: number,
  setSelectedPostId: (id: number) => void,
};

export const PostsList: React.FC<Props> = ({ posts, setSelectedPostId, selectedPostId }) => (
  <div className="PostsList">
    <h2>Posts:</h2>

    <ul className="PostsList__list">
      {posts.map(post => (
        <li key={post.id} className="PostsList__item">
          <div>
            <b>{`[User #${post.userId}]: `}</b>
            {post.title}
          </div>

          {post.id === selectedPostId ? (
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => setSelectedPostId(0)}
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
