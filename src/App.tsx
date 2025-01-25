import { useEffect, useState } from 'react';
import classNames from 'classnames';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import { client } from './utils/fetchClient';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { Post } from './types/Post';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
    setSelectedPost(null);
  };

  const loadUsers = async () => {
    setIsLoading(true);
    setError('');

    try {
      const usersResponse = await client.get<User[]>('/users');

      setUsers(usersResponse);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to fetch users');
    } finally {
      setIsLoading(false);
    }
  };

  const loadPosts = async (userId: number) => {
    setIsLoading(true);
    setError('');

    try {
      const postsResponse = await client.get<Post[]>(`/posts?userId=${userId}`);

      setPosts(postsResponse);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to fetch posts');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      loadPosts(selectedUser.id);
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
                  onSelectUser={handleSelectUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && !isLoading && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoading && <Loader />}

                {error && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {error ? error : 'Something went wrong!'}
                  </div>
                )}

                {!isLoading && !!posts.length ? (
                  <PostsList
                    posts={posts}
                    onPostSelect={setSelectedPost}
                    selectedPost={selectedPost}
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
            <div className="tile is-child box is-success ">
              {selectedPost && <PostDetails selectedPost={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
