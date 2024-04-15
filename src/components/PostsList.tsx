import React, { useContext, useMemo } from 'react';
import cn from 'classnames';
import { AppContext } from './AppState';
import { PostItem } from './PostItem';
import { Loader } from './Loader';
import { ErrorMessage, LoadingType } from '../types';

export const PostsList: React.FC = () => {
  const { posts, errorMessage, loadingType } = useContext(AppContext);

  const isLoading = useMemo(
    () => loadingType === LoadingType.Posts,
    [loadingType],
  );

  const hasError = useMemo(
    () => errorMessage === ErrorMessage.LoadingPosts,
    [errorMessage],
  );

  return (
    <>
      {(isLoading && <Loader />) ||
        (hasError && (
          <div className="notification is-danger" data-cy="PostsLoadingError">
            {errorMessage}
          </div>
        )) ||
        (!posts.length ? (
          <div className="notification is-warning" data-cy="NoPostsYet">
            No posts yet
          </div>
        ) : (
          <div data-cy="PostsList">
            <p className="title">Posts:</p>
            <table
              className={cn(
                'table',
                'is-fullwidth',
                'is-striped',
                'is-hoverable',
                'is-narrow',
              )}
            >
              <thead>
                <tr className="has-background-link-light">
                  <th>#</th>
                  <th>Title</th>
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <th> </th>
                </tr>
              </thead>

              <tbody>
                {posts.map(post => (
                  <PostItem post={post} key={post.id} />
                ))}
              </tbody>
            </table>
          </div>
        ))}
    </>
  );
};
