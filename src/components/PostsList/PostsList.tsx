import React from 'react';
import './PostsList.scss';

type Props = {
  posts: Post[];
  openDetail: (postId: number) => void;
  testId: number;
};

export const PostsList: React.FC<Props> = ({
  posts,
  openDetail,
  testId,
}) => (
  <div className="PostsList">
    <h2>Posts:</h2>

    <ul className="PostsList__list">
      {posts.map(post => (
        <li key={post.id} className="PostsList__item">
          <div>
            <b>{`[User #${post.userId}]: `}</b>
            {post.body}
          </div>
          {testId === post.id ? (
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => openDetail(0)}
            >
              Close
            </button>
          ) : (
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => openDetail(post.id)}
            >
              Open
            </button>
          )}
        </li>
      ))}
    </ul>
  </div>
);
