import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { Post } from './types/Post';
import { getPosts } from './api/posts';

export const App: React.FC = () => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (currentUser) {
      setIsLoading(true);
      getPosts(currentUser.id)
        .then(setPosts)
        .catch(() => setIsError(true))
        .finally(() => setIsLoading(false));
    }
  }, [currentUser]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              </div>

              <div className="block" data-cy="MainContent">

                {!currentUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}
                {isLoading ? (
                  <Loader />
                ) : (
                  <>
                    {isError && (
                      <div
                        className="notification is-danger"
                        data-cy="PostsLoadingError"
                      >
                        Something went wrong!
                      </div>
                    )}

                    {!posts.length && currentUser && (
                      <div
                        className="notification is-warning"
                        data-cy="NoPostsYet"
                      >
                        No posts yet
                      </div>
                    )}

                    {!!posts.length && (
                      <PostsList
                        posts={posts}
                        currentPost={currentPost}
                        setCurrentPost={setCurrentPost}
                      />
                    )}
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
              {
                'Sidebar--open': currentPost,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {currentPost && (
                <PostDetails
                  currentPost={currentPost}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
