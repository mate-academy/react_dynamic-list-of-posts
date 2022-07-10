import React from 'react';
import './PostsList.scss';
import { Post } from '../../react-app-env';

interface Props {
  posts: Post[];
  postSelectId: number;
  onPostSelect: (postId: number) => void
}

export const PostsList: React.FC<Props> = ({
  posts,
  postSelectId,
  onPostSelect,
}) => (
  <div className="PostsList">
    <h2>Posts:</h2>

    <ul className="PostsList__list">
      {posts.map(post => (
        <li className="PostsList__item" key={post.id}>
          <div>
            <b>{`[User #${post.userId}]:`}</b>
            {post.title}
          </div>

          {post.id !== postSelectId ? (
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => onPostSelect(post.id)}
            >
              Open
            </button>
          ) : (
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => onPostSelect(0)}
            >
              Close
            </button>
          )}
        </li>
      ))}
    </ul>
  </div>
);
