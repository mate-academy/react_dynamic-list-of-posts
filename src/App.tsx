import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { useEffect, useState } from 'react';
import { client } from './utils/fetchClient';

export const App = () => {
  const [users, setUsers] = useState<Array<{ id: number; name: string }>>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [showNewCommentForm, setShowNewCommentForm] = useState(false);

  useEffect(() => {
    client
      .get<Array<{ id: number; name: string }>>('/users')
      .then(setUsers)
      .catch(() => {
        setErrorMessage('Something went wrong!');
      });
  }, []);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  setSelectedUserId={setSelectedUserId}
                  selectedUserId={selectedUserId}
                  setSelectedPostId={setSelectedPostId}
                />
              </div>

              {selectedUserId ? (
                <div className="block" data-cy="MainContent">
                  {selectedUserId ? null : (
                    <p data-cy="NoSelectedUser">No user selected</p>
                  )}

                  {errorMessage ? (
                    <div
                      className="notification is-danger"
                      data-cy="PostsLoadingError"
                    >
                      Something went wrong!
                    </div>
                  ) : null}

                  <PostsList
                    userId={selectedUserId}
                    setSelectedPostId={setSelectedPostId}
                    setShowNewCommentForm={setShowNewCommentForm}
                  />
                </div>
              ) : (
                <div className="block" data-cy="MainContent">
                  <p data-cy="NoSelectedUser">No user selected</p>
                </div>
              )}
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={classNames(
              'tile',
              'is-parent',
              'is-8-desktop',
              'Sidebar',
              { 'Sidebar--open': selectedPostId },
            )}
          >
            {' '}
            {selectedPostId ? (
              <>
                <div className="tile is-child box is-success ">
                  <div className="content" data-cy="PostDetails">
                    <PostDetails
                      selectedPostId={selectedPostId}
                      userId={selectedUserId}
                      showNewCommentForm={showNewCommentForm}
                      setShowNewCommentForm={setShowNewCommentForm}
                    />
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
};
