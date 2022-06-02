/* eslint-disable no-console */
import React from 'react';
import './PostsList.scss';

type Props = {
  posts: Post[],
  selectedPostId: number,
  setSelectedPostId: (id: number) => void,
};

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPostId,
  setSelectedPostId,
}) => {
  const getSelectedPost = (id: number) => {
    if (selectedPostId !== 0 && selectedPostId !== id) {
      setSelectedPostId(0);
    }

    setSelectedPostId(id);
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => (
          <li
            className="PostsList__item"
            key={post.id}
          >
            <div>
              <b>
                [User #
                {post.userId}
                ]:
              </b>
              {post.title}
            </div>
            {selectedPostId === post.id ? (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => setSelectedPostId(0)}
              >
                Close
              </button>
            ) : (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => getSelectedPost(post.id)}
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
