import React from 'react';

import './PostsList.scss';

type Props = {
  posts: Post[],
  selectedPostId: number,
  setSelectedPostId: (postId: number) => void,
};

export const PostsList: React.FC<Props> = React.memo(({
  posts,
  selectedPostId,
  setSelectedPostId,
}) => {
  // eslint-disable-next-line no-console
  console.log('post list re');

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      {posts.length === 0
        ? <p>No posts found</p>
        : (
          <ul className="PostsList__list">
            {posts.map(post => (
              <li className="PostsList__item" key={post.id}>
                <div>
                  <b>{`[User #${post.userId}]: `}</b>
                  {post.title}
                </div>

                {post.id === selectedPostId ? (
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
                    onClick={() => setSelectedPostId(post.id)}
                  >
                    Open
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
    </div>
  );
});
