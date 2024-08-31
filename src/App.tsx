import React from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { Notification } from './components/Notification';
import { Future } from './components/Future';

import { useAppContext } from './BLoC/App/AppContext';

import { NotificationType } from './enums';
import { NoUserSelectedError } from './errors/NoUserSelectedError';

export const App: React.FC = () => {
  const { posts, selectedPost } = useAppContext();

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
                <Future
                  future={posts}
                  whilePending={() => <Loader />}
                  whileError={error => {
                    if (error instanceof NoUserSelectedError) {
                      return <p data-cy="NoSelectedUser">No user selected</p>;
                    }

                    return (
                      <Notification
                        type={NotificationType.Error}
                        text="Something went wrong!"
                        data-cy="PostsLoadingError"
                      />
                    );
                  }}
                  whileReady={value => {
                    return (
                      <>
                        {value?.length === 0 ? (
                          <Notification
                            type={NotificationType.Warning}
                            text="No posts yet"
                            data-cy="NoPostsYet"
                          />
                        ) : (
                          <PostsList />
                        )}
                      </>
                    );
                  }}
                />
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
              { 'Sidebar--open': Boolean(selectedPost) },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && <PostDetails />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
