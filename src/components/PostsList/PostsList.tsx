import React from 'react';
import { Loader } from '../Loader';
import './PostsList.scss';

type Props = {
  posts: Post[],
  isLoading: boolean,
  selectedPostId: number | null,
  onPostSelect: CallableFunction,
};

export const PostsList: React.FC<Props> = ({
  posts,
  isLoading,
  selectedPostId,
  onPostSelect,
}) => {
  return (
    <div className="PostsList">
      <h2>Posts:</h2>
      {isLoading ? (
        <Loader />
      ) : (
        <ul className="PostsList__list" data-cy="postDetails">
          {posts.map(post => (
            <li key={post.id} className="PostsList__item">
              <div>
                <b>{`[User #${post.userId}]: `}</b>
                {post.title}
              </div>
              {selectedPostId === post.id
                ? (
                  <button
                    type="button"
                    className="PostsList__button button"
                    onClick={() => onPostSelect(0)}
                  >
                    Close
                  </button>
                ) : (
                  <button
                    type="button"
                    className="PostsList__button button"
                    onClick={() => onPostSelect(post.id)}
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
};
