import React, { useState, useEffect, useMemo } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import cn from 'classnames';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

import { getUsers } from './api/users';
import { getPosts } from './api/posts';
import { User } from './types/User';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [isPostsLoading, setIsPostsLoading] = useState(false);
  const [isLoadingPostsFinish, setIsLoadingPostsFinish] = useState(false);
  const [isErrorOnPostsLoading, setIsErrorOnPostsLoading] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const loadUsers = async () => {
    try {
      const loadedUsers = await getUsers();

      setUsers(loadedUsers);
    } catch (error) {
      throw new Error('Can\'t load users');
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const loadPosts = async (userId: number) => {
    try {
      setIsErrorOnPostsLoading(false);
      setIsPostsLoading(true);
      setIsLoadingPostsFinish(false);

      const loadedPosts = await getPosts(userId);

      setPosts(loadedPosts);
    } catch (error) {
      setIsErrorOnPostsLoading(true);
    } finally {
      setIsPostsLoading(false);
      setIsLoadingPostsFinish(true);
    }
  };

  useEffect(() => {
    if (selectedUserId) {
      loadPosts(selectedUserId);
    }
  }, [selectedUserId]);

  const selectedPost = useMemo(() => (
    posts.find(post => post.id === selectedPostId)
  ), [selectedPostId]);

  const isNoPostsYet = useMemo(() => (
    isLoadingPostsFinish && !isErrorOnPostsLoading && posts.length === 0
  ), [posts, isLoadingPostsFinish, isErrorOnPostsLoading]);

  const isSidebarOpened = useMemo(() => (
    selectedPost && selectedUserId && selectedPost.userId === selectedUserId
  ), [selectedPost, selectedUserId]);

  const isPostsVisible = useMemo(() => (
    posts.length > 0 && isLoadingPostsFinish
  ), [posts, isLoadingPostsFinish]);

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
                  onUserSelect={setSelectedUserId}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUserId && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isPostsLoading && <Loader />}

                {isErrorOnPostsLoading && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {isNoPostsYet && (
                  <div
                    className="notification is-warning"
                    data-cy="NoPostsYet"
                  >
                    No posts yet
                  </div>
                )}

                {isPostsVisible && (
                  <PostsList
                    posts={posts}
                    selectedPost={selectedPost}
                    setSelectedPostId={setSelectedPostId}
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
              {
                'Sidebar--open': isSidebarOpened,
              },
            )}
          >
            {selectedPost && (
              <div className="tile is-child box is-success ">
                <PostDetails
                  post={selectedPost}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
