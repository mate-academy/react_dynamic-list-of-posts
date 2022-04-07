import React from 'react';
import { Post } from '../../types/Post';
import './PostsList.scss';

type Props = {
  posts: Post[]
};

export const PostsList: React.FC<Props> = ({ posts }) => (
  <div className="PostsList">
    <h2>Posts:</h2>

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
          >
            Open
          </button>
        </li>
      ))}
    </ul>
  </div>
);
