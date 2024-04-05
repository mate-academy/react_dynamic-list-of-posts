import { useContext } from 'react';
import { PostsList } from './PostsList';
import { StateContext } from '../Store';
import { Loader } from './Loader';

export const MainContent: React.FC = () => {
  const { selectedUser, posts, isLoading, errorMessage } =
    useContext(StateContext);

  return (
    <div className="block" data-cy="MainContent">
      {isLoading && <Loader />}

      {!!posts.length && !isLoading && !errorMessage && <PostsList />}

      {!selectedUser && !isLoading && (
        <p data-cy="NoSelectedUser">No user selected</p>
      )}

      {errorMessage && (
        <div className="notification is-danger" data-cy="PostsLoadingError">
          {errorMessage}
        </div>
      )}

      {selectedUser && !posts.length && !isLoading && !errorMessage && (
        <div className="notification is-warning" data-cy="NoPostsYet">
          No posts yet
        </div>
      )}
    </div>
  );
};
