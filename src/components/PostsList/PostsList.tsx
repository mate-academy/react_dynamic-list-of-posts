import React from 'react';
import { Post } from '../../types/Post';
import './PostsList.scss';

type Props = {
  posts: Post[],
  setSelectedPostId: (id: number) => void,
  selectedPostId: number,
};

export const PostsList: React.FC<Props> = ({ posts, setSelectedPostId, selectedPostId }) => (
  <div className="PostsList">
    <h2>Posts:</h2>

    <ul className="PostsList__list">
      {posts.map(post => (
        <li key={post.id} className="PostsList__item">
          <div>
            <b>{`User #${post.userId}:`}</b>
            {post.title}
          </div>
          {selectedPostId === post.id ? (
            <button
              onClick={() => setSelectedPostId(0)}
              type="button"
              className="PostsList__button button"
            >
              Close
            </button>
          )
            : (
              <button
                onClick={() => setSelectedPostId(post.id)}
                type="button"
                className="PostsList__button button"
              >
                Open
              </button>
            )}
        </li>
      ))}
    </ul>
  </div>
);
