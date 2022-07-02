import React from 'react';
import classNames from 'classnames';
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

              <button
                type="button"
                className={classNames(
                  'PostsList__button',
                  'button',
                  { 'is-active': selectedPostId === post.id },
                )}
                onClick={() => {
                  if (selectedPostId === post.id) {
                    return onPostSelect(0);
                  }

                  return onPostSelect(post.id);
                }}
              >
                {selectedPostId === post.id
                  ? 'Close'
                  : 'Open'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
