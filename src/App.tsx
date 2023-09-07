import React, { useState, useEffect, useRef } from 'react';
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
import { getUserPosts } from './api/posts';

export const App: React.FC = () => {
  const [chosenUser, setChosenUser] = useState<User | null>(null);
  const [chosenPost, setChosenPost] = useState<Post | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [updateAt, setUpdateAt] = useState(new Date());
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;

      return;
    }

    if (chosenUser) {
      setIsLoading(true);
      setHasError(false);

      getUserPosts(chosenUser.id)
        .then(setPosts)
        .catch(() => setHasError(true))
        .finally(() => setIsLoading(false));
    }
  }, [chosenUser, updateAt]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  chosenUser={chosenUser}
                  onChangeUser={setChosenUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!chosenUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoading ? (
                  <Loader />
                ) : (
                  <>
                    {hasError && (
                      <div
                        className="notification is-danger"
                        data-cy="PostsLoadingError"
                      >
                        <span
                          style={{ display: 'block', marginBottom: '12px' }}
                        >
                          Something went wrong!
                        </span>
                        <div className="control">
                          <button
                            type="button"
                            className={classNames('button is-link is-light', {
                              'is-loading': isLoading,
                            })}
                            onClick={() => setUpdateAt(new Date())}
                          >
                            Retry Loading...
                          </button>
                        </div>
                      </div>
                    )}

                    {chosenUser && (
                      <>
                        {!posts.length && !hasError && (
                          <div
                            className="notification is-warning"
                            data-cy="NoPostsYet"
                          >
                            No posts yet
                          </div>
                        )}

                        {!!posts.length && !hasError && (
                          <PostsList
                            posts={posts}
                            chosenPost={chosenPost}
                            onPostChange={setChosenPost}
                          />
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
            className={classNames(
              'tile',
              'is-parent',
              'is-8-desktop',
              'Sidebar',
              { 'Sidebar--open': chosenPost && !hasError },
            )}
          >
            <div className="tile is-child box is-success ">
              {chosenPost && <PostDetails post={chosenPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
