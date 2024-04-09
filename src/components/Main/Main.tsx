import { FC } from 'react';
import { useGlobalContext } from '../../lib/GlobalContext';
import { Loader } from '../Loader';
import { PostsList } from '../PostsList';

export const Main: FC = () => {
  const { selectUser, posts, hasErrorMessage, isPostLoading, isSideBarOpen } =
    useGlobalContext();

  const hasPosts = posts && !!posts.length && !isPostLoading;
  const isWarning = !hasPosts && !isPostLoading && !hasErrorMessage;
  const isLoadingPosts = isPostLoading && !isSideBarOpen;

  return (
    <div className="block" data-cy="MainContent">
      {!selectUser && <p data-cy="NoSelectedUser">No user selected</p>}

      {isLoadingPosts && <Loader />}

      {selectUser && (
        <>
          {hasErrorMessage && !isSideBarOpen && (
            <div className="notification is-danger" data-cy="PostsLoadingError">
              Something went wrong!
            </div>
          )}

          {isWarning && (
            <div className="notification is-warning" data-cy="NoPostsYet">
              No posts yet
            </div>
          )}

          {hasPosts && <PostsList />}
        </>
      )}
    </div>
  );
};
