import React, { useContext, useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { Loader } from './components/Loader';
import { Sidebar } from './components/Sidebar';
import { UserSelector } from './components/UserSelector';
import { PostsList } from './components/PostsList';
import { PostContext } from './context/PostContext';
import * as postAPI from './api/postAPI';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const {
    posts,
    selectedUser,
    errorMessage,
    setErrorMessage,
    setPosts,
  } = useContext(PostContext);

  useEffect(() => {
    if (!selectedUser) {
      return;
    }

    setLoading(true);

    postAPI.getPosts(selectedUser.id)
      .then(setPosts)
      .catch(() => setErrorMessage('Something went wrong!'))
      .finally(() => setLoading(false));
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
                {!selectedUser && !errorMessage && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {loading ? <Loader /> : (
                  <>
                    {errorMessage && (
                      <div
                        className="notification is-danger"
                        data-cy="PostsLoadingError"
                      >
                        {errorMessage}
                      </div>
                    )}

                    {!errorMessage && selectedUser && posts.length === 0 && (
                      <div
                        className="notification is-warning"
                        data-cy="NoPostsYet"
                      >
                        No posts yet
                      </div>
                    )}

                    {posts.length > 0 && <PostsList />}
                  </>
                )}
              </div>
            </div>
          </div>

          <Sidebar />
        </div>
      </div>
    </main>
  );
};
