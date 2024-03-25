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
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isPostsLoading, setIsPostsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);

  const isNoPostsYet =
    !hasError && posts?.length === 0 && currentUser && !isPostsLoading;

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    setCurrentPost(null);
    setPosts([]);
    setIsPostsLoading(true);

    getPosts(currentUser.id)
      .then(postsFromServer => {
        setPosts(postsFromServer);
      })
      .catch(() => setHasError(true))
      .finally(() => setIsPostsLoading(false));
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
                  hasError={hasError}
                  setHasError={setHasError}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!currentUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isPostsLoading && <Loader />}

                {hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {isNoPostsYet && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {!hasError && posts?.length > 0 && (
                  <PostsList
                    posts={posts}
                    currentPost={currentPost}
                    setCurrentPost={setCurrentPost}
                  />
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
              { 'Sidebar--open': currentPost },
            )}
          >
            {currentPost && (
              <div className="tile is-child box is-success ">
                <PostDetails currentPost={currentPost} />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
