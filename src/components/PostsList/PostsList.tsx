import React from 'react';

import './PostsList.scss';

type Props = {
  posts: Post[],
  postId: number,
  setPostId: (id: number) => void,
};

export const PostsList: React.FC<Props> = ({
  posts,
  postId,
  setPostId,
}) => (
  <div className="PostsList">
    <h2>Posts:</h2>

    {posts.length === 0
      ? <p>Posts not found</p>
      : (
        <ul className="PostsList__list" data-cy="postsList">
          {posts.map(post => (
            <li className="PostsList__item" key={post.id}>
              <div>
                <b>{`[User #${post.userId}]: `}</b>
                {post.title}
              </div>

              { postId === post.id ? (
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => setPostId(0)}
                >
                  Close
                </button>
              ) : (
                <button
                  data-cy="openButton"
                  type="button"
                  className="PostsList__button button"
                  onClick={() => setPostId(post.id)}
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