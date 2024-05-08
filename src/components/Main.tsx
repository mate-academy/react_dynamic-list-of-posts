import { usePostContext } from '../utils/PostContext';
import { Loader } from './Loader';
import { PostsList } from './PostsList';

export const Main: React.FC = () => {
  const { posts, selectedUser, isPostLoading, isPostLoadingError } =
    usePostContext();

  return (
    <div className="block" data-cy="MainContent">
      {!selectedUser && <p data-cy="NoSelectedUser">No user selected</p>}

      {isPostLoading && <Loader />}

      {selectedUser && (
        <>
          {isPostLoadingError && (
            <div className="notification is-danger" data-cy="PostsLoadingError">
              Something went wrong!
            </div>
          )}

          {!isPostLoadingError && !posts.length && !isPostLoading && (
            <div className="notification is-warning" data-cy="NoPostsYet">
              No posts yet
            </div>
          )}

          {!isPostLoading && !isPostLoadingError && !!posts.length && <PostsList />}
        </>
      )}
    </div>
  );
};
