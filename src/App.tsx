import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { SelectedPostId, SelectedUserId } from './types/types';
import { getUsers } from './api/users';
import { getUserPosts } from './api/posts';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<SelectedUserId>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<SelectedPostId>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleUserSelect = async (userId: number) => {
    setSelectedUserId(userId);
    setIsLoading(true);
    setError(false);

    try {
      const loadedPosts = await getUserPosts(userId);

      setPosts(loadedPosts);
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePostSelect = (postId: SelectedPostId) =>
    setSelectedPostId(postId);

  const loadUsers = async () => {
    try {
      const loadedUsers = await getUsers();

      setUsers(loadedUsers);
    } catch {
      setError(true);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const selectedUser = useMemo(
    () => users.find(user => user.id === selectedUserId) || null,
    [users, selectedUserId],
  );

  const selectedPost = useMemo(
    () => posts.find(post => post.id === selectedPostId) || null,
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
                  selectedUser={selectedUser}
                  onUserSelect={handleUserSelect}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {isLoading ? (
                  <Loader />
                ) : error ? (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                ) : !selectedUser ? (
                  <p data-cy="NoSelectedUser">No user selected</p>
                ) : !posts.length ? (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                ) : (
                  <PostsList
                    posts={posts}
                    selectedPostId={selectedPostId}
                    onPostSelect={handlePostSelect}
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
              { 'Sidebar--open': selectedPost },
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
