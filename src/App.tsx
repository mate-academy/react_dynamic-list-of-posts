/* eslint-disable @typescript-eslint/indent */
import classNames from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';

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
  const [users, setUsers] = useState<User[]>([]);
  const [isUsersLoading, setIsUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState<string | null>(null);

  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const [posts, setPosts] = useState<Post[]>([]);
  const [isPostsLoading, setIsPostsLoading] = useState(false);
  const [postsError, setPostsError] = useState<string | null>(null);

  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  useEffect(() => {
    setIsUsersLoading(true);
    setUsersError(null);

    client
      .get<User[]>('/users')
      .then(setUsers)
      .catch(() => setUsersError('Failed to load users'))
      .finally(() => setIsUsersLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedUserId) {
      setPosts([]);
      setSelectedPostId(null);
      setIsPostsLoading(false);
      setPostsError(null);

      return;
    }

    setIsPostsLoading(true);
    setPostsError(null);
    setSelectedPostId(null);

    client
      .get<Post[]>(`/posts?userId=${selectedUserId}`)
      .then(setPosts)
      .catch(() => setPostsError('Failed to load posts'))
      .finally(() => setIsPostsLoading(false));
  }, [selectedUserId]);

  const selectedPost = useMemo(
    () => posts.find(p => p.id === selectedPostId) || null,
    [posts, selectedPostId],
  );

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
                  onChange={setSelectedUserId}
                  disabled={isUsersLoading && users.length === 0}
                  loading={isUsersLoading}
                  error={usersError}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUserId && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isPostsLoading && <Loader />}

                {!isPostsLoading && postsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {!isPostsLoading &&
                  !postsError &&
                  selectedUserId &&
                  posts.length === 0 && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )}

                {!isPostsLoading && !postsError && posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    selectedPostId={selectedPostId}
                    onToggle={postId =>
                      setSelectedPostId(curr =>
                        curr === postId ? null : postId,
                      )
                    }
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
              { 'Sidebar--open': Boolean(selectedPostId) },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && (
                <PostDetails post={selectedPost} key={selectedPost.id} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
