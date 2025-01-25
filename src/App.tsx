import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { UserSelector } from './components/UserSelector';
import { useState, useEffect } from 'react';
import { User } from './types/User';
import { getUserPosts, getUsers } from './utils/api';
import { Post } from './types/Post';
import { PostsList } from './components/PostsList';
import { Loader } from './components/Loader';
import { PostDetails } from './components/PostDetails';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const usersFromServer = await getUsers();

        setUsers(usersFromServer);
      } catch (err) {
        setError(true);
      }
    };

    loadUsers();
  }, []);

  useEffect(() => {
    const loadUserPosts = async (userId: number) => {
      setIsLoading(true);
      setError(false);
      try {
        const postsFromServer = await getUserPosts(userId);

        setPosts(postsFromServer);
      } catch (err) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (selectedUser) {
      setSelectedPost(null);
      loadUserPosts(selectedUser.id);
    } else {
      setPosts([]);
    }
  }, [selectedUser]);

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
                  onSelectedUser={setSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && posts.length === 0 && !isLoading && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoading && <Loader />}

                {error && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {!isLoading && !!posts.length ? (
                  <PostsList
                    posts={posts}
                    selectedPost={selectedPost}
                    onSelectedPost={setSelectedPost}
                  />
                ) : (
                  !isLoading &&
                  !error &&
                  posts.length === 0 &&
                  selectedUser && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )
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
            {selectedPost && (
              <div className="tile is-child box is-success">
                <PostDetails post={selectedPost} />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
