import React, { useMemo, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import cn from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getPostsByUserId } from './api/posts';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPostId, setSelectedPostId] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSelectedUserChange = (userId: number) => {
    setErrorMessage('');
    setSelectedUserId(userId);
    setIsLoading(true);

    getPostsByUserId(userId)
      .then(loadedPosts => {
        setPosts(loadedPosts);
      })
      .catch(() => setErrorMessage("Can't load todos"))
      .finally(() => setIsLoading(false));
  };

  const selectedPost = useMemo(() => (
    posts.find(post => post.id === selectedPostId) ?? null
  ), [selectedPostId]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  selectedId={selectedUserId}
                  onSelect={handleSelectedUserChange}
                  onErrorCatch={setErrorMessage}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {selectedUserId === 0 && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
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

                {selectedUserId !== 0 && posts.length === 0 && !isLoading && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    onPostBtnClick={setSelectedPostId}
                    selectedPostId={selectedPostId}
                  />
                )}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={cn(
              'tile',
              'is-parent',
              'is-8-desktop',
              'Sidebar',
              { 'Sidebar--open': selectedPostId !== 0 },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && (
                <PostDetails
                  post={selectedPost}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
