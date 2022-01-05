import React from 'react';
import { Post } from '../../Types/Post';
import './PostsList.scss';

type Props = {
  posts: Post[],
  selectedPost: Post['id'];
  selectPost: (id: Post['id']) => void,
};

export const PostsList: React.FC<Props> = ({ posts, selectedPost, selectPost }) => {
  return (
    <div className="PostsList">
      <h2>Posts:</h2>
      <ul className="PostsList__list">
        {posts.map(({ id, userId, title }) => (
          <li className="PostsList__item" key={id}>
            <div>
              <b>{`[User #${userId}]: `}</b>
              {title}
            </div>
            {selectedPost === id ? (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => selectPost(0)}
              >
                Close
              </button>
            ) : (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => selectPost(id)}
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
