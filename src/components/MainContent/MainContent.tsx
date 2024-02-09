import { useContext } from 'react';
import { User } from '../../types/User';
import { PostsList } from '../PostsList/PostsList';
import { MainContext } from '../MainContext/MainContext';
import { Loader } from '../Loader';
import { Errors } from '../../types/Errors';

type Props = {
  choosedUser?: User,
};

export const MainContent: React.FC<Props> = ({ choosedUser }) => {
  const {
    posts,
    error,
    isLoading,
  } = useContext(MainContext);

  return (
    <div className="block" data-cy="MainContent">
      {!choosedUser && (
        <p data-cy="NoSelectedUser">
          No user selected
        </p>
      )}

      {isLoading && !posts.length && (<Loader />)}

      {error === Errors.POST && (
        <div
          className="notification is-danger"
          data-cy="PostsLoadingError"
        >
          Something went wrong!
        </div>
      )}

      {!posts.length && choosedUser && !isLoading && !error && (
        <div className="notification is-warning" data-cy="NoPostsYet">
          No posts yet
        </div>
      )}

      {posts && posts.length >= 1 && (<PostsList />)}
    </div>
  );
};
