import React from 'react';
import { Post } from '../../types/Post';
import './PostsList.scss';

type Props = {
  posts: Post[],
  selectedPostId: number,
  setSelectedPostId: React.Dispatch<React.SetStateAction<number>>
};

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPostId,
  setSelectedPostId,
}) => {
  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list" data-cy="postDetails">
        {posts.map(post => (
          <li key={`${post.id}`} className="PostsList__item">
            <div>
              <b>{`[User #${post.userId}]: `}</b>
              {post.title}
            </div>
            {post.id === selectedPostId ? (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => setSelectedPostId(NaN)}
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
    </div>
  );
};
