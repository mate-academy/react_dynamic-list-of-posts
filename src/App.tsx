import React, { useContext, useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import cn from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { UsersContext } from './contexts/UsersProvider';
import { ErrorMessage } from './components/ErrorMessage';
import { PostUpdateContext, PostsContext } from './contexts/PostProvider';

export const App: React.FC = () => {
  const {
    isLoading,
    selectedUser,
    userPosts,
    errorMessage,
  } = useContext(UsersContext);
  const { selectedPost } = useContext(PostsContext);
  const { setSelectedPost } = useContext(PostUpdateContext);

  useEffect(() => {
    setSelectedPost(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUser]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoading && <Loader />}

                {!isLoading && (
                  <>
                    {!!errorMessage && (
                      <ErrorMessage errorMessage={errorMessage} />
                    )}

                    {!userPosts.length && !!selectedUser && !errorMessage && (
                      <div
                        className="notification is-warning"
                        data-cy="NoPostsYet"
                      >
                        No posts yet
                      </div>
                    )}

                    {!!selectedUser && !errorMessage && !!userPosts.length && (
                      <PostsList />
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={cn(
              'tile',
              'is-parent',
              'is-8-desktop',
              'Sidebar',
              {
                'Sidebar--open': !!selectedPost,
              },
            )}
          >
            {!!selectedPost && (
              <div className="tile is-child box is-success ">
                <PostDetails post={selectedPost} />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
