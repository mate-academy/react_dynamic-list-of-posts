import React from 'react';
import './PostsList.scss';
import { Post } from '../../types/post';

interface Props {
  posts: Post[];
  selectPostId: any,
  selectedPostId: number,
}

export const PostsList: React.FC<Props> = ({ posts, selectPostId, selectedPostId }) => (
  <div className="PostsList">
    <h2>Posts:</h2>

    <ul className="PostsList__list">
      {posts.map((post: Post) => {
        return (
          <li className="PostsList__item" key={post.id}>
            <div>
              <b>{`[User #${post.userId}]: `}</b>
              {post.body}
            </div>
            {post.id === selectedPostId ? (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => selectPostId(0)}
              >
                Close
              </button>
            ) : (
              <button
                type="button"
                className="PostsList__user-button button"
                onClick={() => selectPostId(post.id)}
              >
                Open
              </button>
            )}
          </li>
        );
      })}
    </ul>
  </div>
);
