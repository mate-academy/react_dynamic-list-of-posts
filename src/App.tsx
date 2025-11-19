import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

import { client } from './utils/fetchClient';
import { User } from './types/User';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const [users, setUsers] = useState<User[]>([]);
  const [isUsersLoading, setIsUsersLoading] = useState(false);
  const [isUsersError, setIsUsersError] = useState(false);

  const [posts, setPosts] = useState<Post[]>([]);
  const [isPostsLoading, setIsPostsLoading] = useState(false);
  const [isPostsError, setIsPostsError] = useState(false);

  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  useEffect(() => {
    setIsUsersLoading(true);
    setIsUsersError(false);

    client
      .get<User[]>('/users')
      .then(setUsers)
      .catch(() => setIsUsersError(true))
      .finally(() => setIsUsersLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedUserId) {
      setPosts([]);
      setSelectedPostId(null);

      return;
    }

    setIsPostsLoading(true);
    setIsPostsError(false);
    setSelectedPostId(null);

    client
      .get<Post[]>(`/posts?userId=${selectedUserId}`)
      .then(setPosts)
      .catch(() => setIsPostsError(true))
      .finally(() => setIsPostsLoading(false));
  }, [selectedUserId]);

  const selectedPost = useMemo(
    () => posts.find(post => post.id === selectedPostId) || null,
    [posts, selectedPostId],
  );

  const handleUserSelect = (userId: number) => {
    setSelectedUserId(userId);
  };

  const handlePostToggle = (postId: number) => {
    setSelectedPostId(current => (current === postId ? null : postId));
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  selectedUserId={selectedUserId}
                  onUserSelect={handleUserSelect}
                  isLoading={isUsersLoading}
                  hasError={isUsersError}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUserId && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {selectedUserId && (
                  <>
                    {isPostsLoading && <Loader />}

                    {isPostsError && (
                      <div
                        className="notification is-danger"
                        data-cy="PostsLoadingError"
                      >
                        Something went wrong!
                      </div>
                    )}

                    {!isPostsLoading && !isPostsError && posts.length === 0 && (
                      <div
                        className="notification is-warning"
                        data-cy="NoPostsYet"
                      >
                        No posts yet
                      </div>
                    )}

                    {!isPostsLoading && !isPostsError && posts.length > 0 && (
                      <PostsList
                        posts={posts}
                        selectedPostId={selectedPostId}
                        onPostToggle={handlePostToggle}
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
              { 'Sidebar--open': Boolean(selectedPost) },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
