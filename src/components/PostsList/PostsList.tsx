import React from 'react';
import './PostsList.scss';

type Props = {
  posts: Post[],
  click: (event: React.MouseEvent<HTMLButtonElement>) => void,
  status: string,
};

export const PostsList: React.FC<Props> = ({
  posts,
  click,
  status,
}) => {
  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map((post) => {
          return (
            <li
              key={post.id}
              className="PostsList__item"
            >
              <div>
                <b>{`User #${post.userId}: `}</b>
                {post.title}
              </div>
              {status !== `${post.id}` && (
                <button
                  type="button"
                  className="PostsList__button button"
                  value={post.id}
                  onClick={click}
                >
                  Open
                </button>
              )}
              {status === `${post.id}` && (
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={click}
                >
                  Close
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
