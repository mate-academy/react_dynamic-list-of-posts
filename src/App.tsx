import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useEffect, useState } from 'react';
import { User } from './types/User';
import { Post } from './types/Post';
import { getUserPosts } from './components/services/posts';
import { PostDetails } from './components/PostDetails';

export const App = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const [activePost, setActivePost] = useState<Post | null>(null);

  const [errorMessage, setErrorMessage] = useState<null | string>(null);

  const [hasPosts, setHasPosts] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [activeUser, setActiveUser] = useState<User | null>(null);

  const resetBeforeGetPosts = () => {
    setPosts([]);
    setHasPosts(false);
    setErrorMessage(null);
    setActivePost(null);
  };

  useEffect(() => {
    if (activeUser?.id) {
      resetBeforeGetPosts();

      setIsLoading(true);
      getUserPosts(activeUser.id)
        .then(postsFromSrv => {
          setPosts(postsFromSrv);
          if (postsFromSrv.length > 0) {
            setHasPosts(true);
          } else {
            setHasPosts(false);
          }
        })
        .catch(() => {
          setHasPosts(false);
          setErrorMessage('Something went wrong!');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [activeUser]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  activeUser={activeUser}
                  setActiveUser={setActiveUser}
                  setErrorMessage={setErrorMessage}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!activeUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}
                {isLoading && <Loader />}

                {errorMessage && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {errorMessage}
                  </div>
                )}

                {hasPosts && activeUser && !isLoading && (
                  <PostsList
                    posts={posts}
                    getActivePost={setActivePost}
                    activePost={activePost}
                  />
                )}

                {!hasPosts && activeUser && !isLoading && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}
              </div>
            </div>
          </div>

          {activePost && !isLoading && (
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
                <PostDetails activePost={activePost} />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
