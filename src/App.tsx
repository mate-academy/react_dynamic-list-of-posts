import React, { useCallback, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { ErrorType } from './types/ErrorTypes';
import { useUserWithPosts } from './components/customHooks/useUserWithPosts';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const [
    selectedUser,
    usersPosts,
    postsIsLoading,
    isLoadingError,
    setSelectedUser,
  ] = useUserWithPosts();
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  // const [errorType, setErrorType] = useState<ErrorType>(ErrorType.None);

  const selectUser = useCallback((userFromServer: User) => {
    setSelectedPost(null);
    setSelectedUser(userFromServer);
  }, [selectedUser]);

  const isPostsAreReady = (
    selectedUser
    && usersPosts
    && !postsIsLoading
    && !isLoadingError
  );

  const selectPost = useCallback(
    (post: Post | null) => {
      setSelectedPost(post);
    }, [selectedPost],
  );

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  onUserSelect={selectUser}
                  selectedUser={selectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {postsIsLoading
                  && <Loader />}

                {isLoadingError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {ErrorType.PostLoading}
                  </div>
                )}

                {(isPostsAreReady && !usersPosts?.length) && (
                  <div
                    className="notification is-warning"
                    data-cy="NoPostsYet"
                  >
                    No posts yet
                  </div>
                )}

                {(isPostsAreReady
                && usersPosts.length !== 0) && (
                  <PostsList
                    selectedPost={selectedPost}
                    onPostOpen={selectPost}
                    posts={usersPosts as Post[]}
                  />
                )}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={classNames(
              'tile',
              'is-parent',
              'is-8-desktop',
              'Sidebar',
              { 'Sidebar--open': selectedPost },
            )}
          >
            {selectedPost && (
              <div className="tile is-child box is-success ">
                <PostDetails
                  selectedPost={selectedPost as Post}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
