import React from 'react';
import { usePostsContext } from '../../customHooks/usePostsContext';
import './PostsList.scss';

export const PostsList: React.FC = React.memo(() => {
  const { posts, selectedPostId, setSelectedPostId } = usePostsContext();

  const handleClick = (id: number) => {
    if (id === selectedPostId) {
      setSelectedPostId(0);
    } else {
      setSelectedPostId(id);
    }
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.length
          ? (
            posts.map(({ id, userId, title }) => (
              <li key={id} className="PostsList__item">
                <div>
                  <b>{`[User #${userId}] `}</b>
                  {title}
                </div>
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => {
                    handleClick(id);
                  }}
                >
                  {selectedPostId === id ? 'Close' : 'Open'}
                </button>
              </li>
            ))
          )
          : 'Not found'}
      </ul>
    </div>
  );
});
