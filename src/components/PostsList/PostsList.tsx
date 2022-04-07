import React from 'react';
import { Post } from '../../types/Post';
import './PostsList.scss';

type Props = {
  posts: Post[],
  onSelect: CallableFunction,
  selectedPostId: number,
};

export const PostsList: React.FC<Props> = ({ posts, onSelect, selectedPostId }) => {
  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      {posts.length ? (
        <ul className="PostsList__list">
          {posts.map(({ title, userId, id }) => (
            <li key={id} className="PostsList__item">
              <div>
                <b>{`[User #${userId}]: `}</b>
                {title}
              </div>

              <button
                type="button"
                className="PostsList__button button"
                onClick={onSelect(selectedPostId !== id ? id : 0)}
              >
                {
                  selectedPostId !== id
                    ? 'Open'
                    : 'Close'
                }
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Not found</p>
      )}
    </div>
  );
};
