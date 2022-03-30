import React from 'react';
import './PostsList.scss';

type Props = {
  posts: Post[],
  postId: number,
  setPostId: (postId: number) => void
};

export const PostsList: React.FC<Props> = ({ posts, postId, setPostId }) => (
  <div className="PostsList">
    <h2>Posts:</h2>

    <ul className="PostsList__list">
      {posts.map((post) => (
        <li className="PostsList__item" key={post.id}>
          <div>
            <b>{`[User #${post.userId}]:`}</b>
            {post.title}
          </div>

          {post.id === postId ? (
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => setPostId(0)}
            >
              Close
            </button>
          ) : (
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => setPostId(post.id)}
            >
              Open
            </button>
          )}
        </li>
      ))}
    </ul>
  </div>
);
