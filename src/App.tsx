import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useEffect, useState } from 'react';
import { Post } from './types/Post';
import { User } from './types/User';
import { getPosts } from './services/post.service';

export const App = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setCurrentPost(null);

    if (!currentUser?.id) {
      setPosts([]);
      setError(false);
      setIsLoading(false);

      return;
    }

    setIsLoading(true);
    setError(false);

    getPosts(currentUser.id)
      .then(data => setPosts(data))
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
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
                  onSelectUser={setCurrentUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!currentUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {currentUser && isLoading && <Loader />}

                {currentUser && !isLoading && error && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {currentUser && !isLoading && !error && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {currentUser && !isLoading && !error && posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    currentPost={currentPost}
                    onPostSelect={setCurrentPost}
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
            <div className="tile is-child box is-success">
              {currentPost && <PostDetails post={currentPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
