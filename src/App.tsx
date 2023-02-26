import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { Post } from './types/Post';
import { getPosts } from './utils/serverHelper';

export const App: React.FC = () => {
  const [userSelectedId, setUserSelectedId] = useState(0);
  const [isVisibleComments, setIsVisibleComments] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isVisibleLoader, setIsVisibleLoader] = useState(false);
  const [isVisiblePosts, setIsVisiblePosts] = useState(false);
  const [isVisiblePostError, setIsVisiblePostError] = useState(false);
  const [isVisibleEmptyPostMessage,
    setIsVisibleEmptyPostMessage] = useState(false);
  const loadPosts = async () => {
    if (userSelectedId === 0) {
      return;
    }

    setIsVisibleLoader(true);
    setIsVisibleEmptyPostMessage(false);
    setIsVisiblePosts(false);

    try {
      const postsFromServer = await getPosts(userSelectedId);

      setPosts(postsFromServer);
      setIsVisiblePostError(false);
      if (postsFromServer.length === 0) {
        setIsVisibleEmptyPostMessage(true);
      } else {
        setIsVisiblePosts(true);
      }
    } catch {
      setIsVisiblePostError(true);
    } finally {
      setIsVisibleLoader(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, [userSelectedId]);

  const handlesetIsVisibleComments = (value: boolean) => {
    setIsVisibleComments(value);
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  setUserSelectedId={setUserSelectedId}
                  userSelectedId={userSelectedId}
                />
              </div>

              <div className="block" data-cy="MainContent">

                {userSelectedId === 0 && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isVisiblePostError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!

                    <button
                      type="button"
                      onClick={() => {
                        handlesetIsVisibleComments(false);
                      }}
                    >
                      click
                    </button>
                  </div>
                )}

                {isVisibleLoader && <Loader />}

                {isVisibleEmptyPostMessage && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {isVisiblePosts && (
                  <PostsList posts={posts} />
                )}

              </div>
            </div>
          </div>

          {isVisibleComments && (
            <div
              data-cy="Sidebar"
              className={classNames(
                'tile',
                'is-parent',
                'is-8-desktop',
                'Sidebar',
                'Sidebar--open',
              )}
            >
              <div className="tile is-child box is-success ">
                <PostDetails />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
