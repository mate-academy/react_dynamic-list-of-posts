import React, { useContext } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { ContextList } from './components/ListProvider/ListProvider';

export const App: React.FC = () => {
  const {
    selectedUser,
    postsList,
    apiLoad,
    isPostNotification,
    errorPostsMessage,
    selectPost,
  } = useContext(ContextList);

  const isPosts =
    selectedUser && postsList.length > 0 && !apiLoad && !errorPostsMessage;

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
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {errorPostsMessage && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {errorPostsMessage}
                  </div>
                )}

                {apiLoad && <Loader />}

                {!apiLoad && isPostNotification && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    {isPostNotification}
                  </div>
                )}

                {isPosts && <PostsList />}
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
              { 'Sidebar--open': selectPost },
            )}
          >
            {selectPost && (
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
