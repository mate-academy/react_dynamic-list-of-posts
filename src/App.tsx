/* eslint-disable prettier/prettier */
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
import { getPosts } from './services/posts';

export const App = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  useEffect(() => {
    setSelectedPostId(null);

    if (selectedUserId === null) {
      return;
    }

    setIsLoading(true);
    setErrorMessage(false);

    getPosts(selectedUserId)
      .then(setPosts)
      .catch(() => setErrorMessage(true))
      .finally(() => setIsLoading(false));
  }, [selectedUserId]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector handleUserIdChange={setSelectedUserId}
                  handlePostIdChange={setSelectedPostId} />
              </div>

              <div className="block" data-cy="MainContent">
                {selectedUserId === null && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoading && <Loader />}

                {errorMessage && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {selectedUserId &&
                  !isLoading &&
                  !errorMessage &&
                  posts.length === 0 && (
                  <div
                    className="notification is-warning"
                    data-cy="NoPostsYet"
                  >
                      No posts yet
                  </div>
                )}

                {!isLoading && posts.length > 0 && (
                  <PostsList
                    selectedPostId={selectedPostId}
                    handlePostChange={setSelectedPostId}
                    posts={posts}
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
              { 'Sidebar--open': selectedPostId }
            )}
          >
            <div className="tile is-child box is-success">
              <PostDetails posts={posts} selectedPostId={selectedPostId} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
