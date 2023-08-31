import React, { useContext, useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import cn from 'classnames';
import { getUsers } from './services/userService';
import { PostsList } from './components/PostsList';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUserPosts } from './services/postService';
import { PostsContext } from './PostsContext';
import { PostDetails } from './components/PostDetails';

export const App: React.FC = () => {
  const {
    setUsers,
    userPosts,
    setUserPosts,
    selectedUser,
    selectedPost,
  } = useContext(PostsContext);

  const [isError, setIsError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  useEffect(() => {
    if (selectedUser) {
      setIsLoading(true);
      getUserPosts(selectedUser.id)
        .then(setUserPosts)
        .catch(() => setIsError(true))
        .finally(() => setIsLoading(false));
    }
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

                {!!selectedUser && (
                  <>
                    {isLoading ? (
                      <Loader />
                    ) : (
                      <>
                        {isError ? (
                          <div
                            className="notification is-danger"
                            data-cy="PostsLoadingError"
                          >
                            Something went wrong!
                          </div>
                        ) : (
                          <>
                            {userPosts.length === 0 ? (
                              <div
                                className="notification is-warning"
                                data-cy="NoPostsYet"
                              >
                                No posts yet
                              </div>
                            ) : (
                              <PostsList />
                            )}
                          </>
                        )}
                      </>
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
              { 'Sidebar--open': selectedPost },
            )}
          >

            {!!selectedPost && (
              <div className="tile is-child box is-success ">
                <PostDetails />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
