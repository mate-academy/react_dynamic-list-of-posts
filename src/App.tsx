import React from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { useSignals } from '@preact/signals-react/runtime';
import { effect } from '@preact/signals-react';
import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import {
  isPostsErrorVisible, isPostsLoaderVisible, isPostsNotificationVisible,
  posts, selectedPost, selectedUser,
} from './signals/signals';
import { getPosts } from './api';

effect(() => {
  if (selectedUser.value) {
    isPostsErrorVisible.value = false;
    posts.value = [];
    isPostsLoaderVisible.value = true;
    getPosts(selectedUser.value.id)
      .then(response => {
        posts.value = response;
      })
      .catch(() => {
        isPostsErrorVisible.value = true;
      })
      .finally(() => {
        isPostsLoaderVisible.value = false;
      });
  }
});

export const App: React.FC = () => {
  useSignals();

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
                {!selectedUser.value && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isPostsLoaderVisible.value && <Loader />}

                {isPostsErrorVisible.value && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {isPostsNotificationVisible.value && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {!!posts.value.length && <PostsList />}
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
              { 'Sidebar--open': selectedPost.value },
            )}
          >
            <div className="tile is-child box is-success ">
              {!!selectedPost.value && <PostDetails />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
