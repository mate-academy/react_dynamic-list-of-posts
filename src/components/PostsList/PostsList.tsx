import React from 'react';
import './PostsList.scss';

interface Props {
  posts: Post[];
  postId: number;
  selectPost: (id: number) => void;
}

export const PostsList: React.FC<Props> = ({ posts, postId, selectPost }) => (
  <div className="PostsList">
    <h2>Posts:</h2>

    <ul className="PostsList__list">
      {posts.map(post => (
        <li className="PostsList__item" key={post.id}>
          <div>
            <b>{`[User #${post.userId}]: `}</b>
            {post.title}
          </div>
          {postId === post.id ? (
            <button
              type="button"
              className="button PostsList__button"
              onClick={() => selectPost(0)}
            >
              Close
            </button>
          ) : (
            <button
              type="button"
              className="button PostsList__button"
              onClick={() => selectPost(post.id)}
            >
              Open
            </button>
          )}
        </li>
      ))}
    </ul>
  </div>
);
