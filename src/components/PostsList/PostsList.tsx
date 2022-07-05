import React from 'react';
import './PostsList.scss';

interface Props {
  selectedPostId: number | null;
  setSelectedPostId: (id: number) => void;
  posts: Post[] | null;
}

export const PostsList: React.FC<Props> = ({
  selectedPostId,
  setSelectedPostId,
  posts,
}) => (
  <div className="PostsList">
    <h2>Posts:</h2>

    <ul className="PostsList__list">

      {posts?.map(post => (
        <li className="PostsList__item">
          <div>
            <b>{`[User #${post.userId}]: `}</b>
            sunt aut facere repellat provident occaecati excepturi optio
          </div>

          {selectedPostId === post.id
            ? (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => setSelectedPostId(0)}
              >
                Close
              </button>
            )
            : (
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
  </div>
);
