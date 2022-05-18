import React from 'react';
import { Post } from '../../types/Post';
import './PostsList.scss';

type Props = {
  posts: Post[],
  selectedPostId: number,
  setSelectedPostId: (arg0: number) => void,
};

export const PostsList: React.FC<Props> = ({ posts, selectedPostId, setSelectedPostId }) => (
  <div className="PostsList">
    <h2>Posts:</h2>

    <ul className="PostsList__list">
      {posts.map(post => (
        <li className="PostsList__item" key={post.id}>
          <div>
            <b>{`[User #${post.userId}]: `}</b>
            {post.title}
          </div>
          {selectedPostId !== post.id ? (
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => setSelectedPostId(post.id)}
            >
              Open
            </button>
          ) : (
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => setSelectedPostId(0)}
            >
              Close
            </button>
          )}
        </li>
      ))}
    </ul>
  </div>
);
