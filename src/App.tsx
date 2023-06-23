import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { getUsers } from './api/UserService';
import { User } from './types/User';
import { getPosts } from './api/PostService';
import { Post } from './types/Post';
import { Loader } from './components/Loader';
import { ErrorValues } from './types/ErrorValues';

export const App: React.FC = () => {
  const [usersFromServer, setUsersFromServer] = useState<User[] | []>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isPostOpen, setIsPostOpen] = useState<Post | null>(null);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [postsForView, setPostsForView] = useState<Post[] | []>([]);
  const [errorMessage, setErrorMessage]
    = useState<ErrorValues | null>(null);

  useEffect(() => {
    getUsers()
      .then(setUsersFromServer);
  }, []);

  useEffect(() => {
    setIsPostOpen(null);
    setErrorMessage(null);
    if (selectedUser) {
      setIsLoadingPosts(true);
      getPosts(selectedUser?.id)
        .then(setPostsForView)
        .catch(() => {
          setErrorMessage(ErrorValues.LoadingPosts);
        })
        .finally(() => {
          setIsLoadingPosts(false);
        });
    }
  }, [selectedUser]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  usersFromServer={usersFromServer}
                  setSelectedUser={setSelectedUser}
                  selectedUser={selectedUser}
                />
              </div>
              <div className="block" data-cy="MainContent">
                { isLoadingPosts ? <Loader /> : (
                  <>
                    { !selectedUser && (
                      <p data-cy="NoSelectedUser">
                        No user selected
                      </p>
                    )}
                    {errorMessage && postsForView.length === 0 && (
                      <div
                        className="notification is-danger"
                        data-cy="PostsLoadingError"
                      >
                        {errorMessage}
                      </div>
                    )}
                    {selectedUser && !!postsForView.length && (
                      <PostsList
                        postsForView={postsForView}
                        setIsPostOpen={setIsPostOpen}
                        isPostOpen={isPostOpen}
                      />
                    )}
                    {
                      selectedUser && !errorMessage && postsForView.length === 0
                      && (
                        <div
                          className="notification is-warning"
                          data-cy="NoPostsYet"
                        >
                          No posts yet
                        </div>
                      )
                    }
                  </>
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
              { 'Sidebar--open': isPostOpen },
            )}
          >
            {errorMessage === ErrorValues.CommentsError && (
              <div className="notification is-danger" data-cy="CommentsError">
                {errorMessage}
              </div>
            )}
            {isPostOpen && (
              <div className="tile is-child box is-success ">
                <PostDetails
                  isPostOpen={isPostOpen}
                  setErrorMessage={setErrorMessage}
                  errorMessage={errorMessage}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
