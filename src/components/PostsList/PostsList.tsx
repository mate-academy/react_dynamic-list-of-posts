import React from 'react';
import './PostsList.scss';
import { Post } from '../../types';
import { Loader } from '../Loader';

interface Props {
  posts: Post[];
  selectedPostId: number;
  selectPost: (postId: number) => void;
}

export const PostsList: React.FC<Props> = React.memo(({
  posts, selectedPostId, selectPost,
}) => {
  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.length
          ? (posts.map(({ id, userId, title }) => (
            <li className="PostsList__item" key={id}>
              <div>
                <b>{`[User #${userId}]: `}</b>
                {title}
              </div>
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => selectPost(selectedPostId !== id ? id : 0)}
              >
                {selectedPostId !== id ? 'Open' : 'Close'}
              </button>
            </li>
          )))
          : (<Loader />)}
      </ul>
    </div>
  );
});
