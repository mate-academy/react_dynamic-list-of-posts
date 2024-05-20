import { useContext } from 'react';

import { PostsList } from '../PostsList/PostsList';
import { Loader } from '../Loader';
import { PostsValueContext } from '../../Context/PostsContext';

export const Main: React.FC = () => {
  const { selectedUser, posts, postsIsLoading, postsError } =
    useContext(PostsValueContext);

  const showNoPostsMessage = selectedUser && !postsIsLoading && !posts.length;

  return (
    <div className="block" data-cy="MainContent">
      {!selectedUser && <p data-cy="NoSelectedUser">No user selected</p>}

      {postsIsLoading && <Loader />}

      {postsError && (
        <div className="notification is-danger" data-cy="PostsLoadingError">
          Something went wrong!
        </div>
      )}

      {!postsError && showNoPostsMessage && (
        <div className="notification is-warning" data-cy="NoPostsYet">
          No posts yet
        </div>
      )}

      <PostsList />
    </div>
  );
};
