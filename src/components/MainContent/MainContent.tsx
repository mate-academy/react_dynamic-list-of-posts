import React, { useContext } from 'react';
import {
  ActivePostContext,
  ActiveUserContext,
  ErrorsContext,
  LoaderContext,
  PostsContext,
} from '../../utils/Store';
import { Loader } from '../Loader';
import { PostsList } from './PostList/PostsList';
import { ErrorTypes } from '../../types/types';

export const MainContent: React.FC = () => {
  const { activeUser } = useContext(ActiveUserContext);
  const { activePost } = useContext(ActivePostContext);
  const { isLoading } = useContext(LoaderContext);
  const { posts } = useContext(PostsContext);
  const { isError } = useContext(ErrorsContext);

  return (
    <div className="block" data-cy="MainContent">
      {!activeUser && <p data-cy="NoSelectedUser">No user selected</p>}

      {isLoading && !activePost && <Loader />}

      {(isError === ErrorTypes.Posts && (
        <div className="notification is-danger" data-cy="PostsLoadingError">
          Something went wrong!
        </div>
      )) ||
        (activeUser && !posts && !isLoading && (
          <div className="notification is-warning" data-cy="NoPostsYet">
            No posts yet
          </div>
        ))}

      {posts && <PostsList posts={posts} />}
    </div>
  );
};
