import { useCallback, useEffect, useMemo, useState } from 'react';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { getUserPost, getUsers } from './api/user';
import { Post } from './types/Post';

import cn from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [loadingPosts, setLoadingPosts] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string>('');

  const [isFormOpen, setIsFormOpen] = useState(false);

  const loadUsers = async () => {
    try {
      const fetchedUsers = await getUsers();

      setUsers(fetchedUsers);
    } catch (error) {
      setErrorMessage('Unable to load users');
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const loadPosts = useCallback(async () => {
    if (!selectedUser) {
      return;
    }

    setLoadingPosts(true);
    try {
      const userPosts = await getUserPost(selectedUser.id);

      setPosts(userPosts);
    } catch (error) {
      setErrorMessage('Unable to load posts');
    } finally {
      setLoadingPosts(false);
    }
  }, [selectedUser]);

  useEffect(() => {
    if (selectedUser?.id !== undefined) {
      loadPosts();
    }
  }, [loadPosts, selectedUser]);

  const shouldShowPostList = useMemo(
    () => selectedUser && !loadingPosts && !errorMessage,
    [selectedUser, loadingPosts, errorMessage],
  );

  const hasPosts = useMemo(() => posts.length > 0, [posts]);

  const handlePostSelect = (post: Post | null) => {
    setSelectedPost(post);
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
                  setSelectedUser={setSelectedUser}
                  selectedUser={selectedUser}
                  setSelectedPost={setSelectedPost}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}
                {loadingPosts && <Loader />}

                {errorMessage && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {shouldShowPostList &&
                  (hasPosts ? (
                    <PostsList
                      posts={posts}
                      selectedPost={selectedPost}
                      onSelectPost={handlePostSelect}
                      setIsFormOpen={setIsFormOpen}
                    />
                  ) : (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={cn('tile', 'is-parent', 'is-8-desktop', 'Sidebar', {
              'Sidebar--open': selectedPost !== null,
            })}
          >
            {selectedPost && (
              <div className="tile is-child box is-success ">
                <PostDetails
                  selectedPost={selectedPost}
                  isFormOpen={isFormOpen}
                  setIsFormOpen={setIsFormOpen}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
