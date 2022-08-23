import React, { useCallback, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

import { client } from './utils/fetchClient';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const getPosts = useCallback((userId: number) => {
    setIsLoading(true);
    client.get<Post[]>(`/posts?userId=${userId}`)
      .then(postsFromServer => {
        setPosts(postsFromServer);
        setHasError(false);
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const selectedPost = posts.find(({ id }) => id === selectedPostId);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  getPosts={getPosts}
                  selectedUserId={selectedUserId}
                  onUserChange={setSelectedUserId}
                  setSelectedPostId={setSelectedPostId}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {selectedUserId === null && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {isLoading && <Loader />}

                {posts.length > 0 && !isLoading && (
                  <PostsList
                    posts={posts}
                    onOpen={setSelectedPostId}
                    selectedPostId={selectedPostId}
                  />
                )}

                {posts.length === 0 && selectedUserId !== null
                && !isLoading && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
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
              { 'Sidebar--open': selectedPostId !== null },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && (<PostDetails post={selectedPost} />)}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
