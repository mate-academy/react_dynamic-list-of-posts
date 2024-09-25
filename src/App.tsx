import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { UserSelector } from './components/UserSelector';
import { useEffect, useState } from 'react';
import { User } from './types/User';
import { Post } from './types/Post';
import { getUsers } from './components/api/users';
import { getUserPosts } from './components/api/users';
import { Loader } from './components/Loader';
import { PostDetails } from './components/PostDetails';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [loadError, setLoadError] = useState<boolean>(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getUsers();

      setUsers(fetchedUsers);
    };

    fetchUsers();
  }, []);

  const handleUserSelect = async (user: { id: number; name: string }) => {
    setSelectedUser(user);
    setIsLoading(true);
    setLoadError(false);
    setSelectedPost(null);
    try {
      const fetchedPosts = await getUserPosts(user.id);

      setPosts(fetchedPosts);
    } catch (error) {
      setLoadError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePostSelect = (post: Post) => {
    if (selectedPost === post || !selectedUser) {
      setSelectedPost(null);
    } else {
      setSelectedPost(post);
    }
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector users={users} onUserSelect={handleUserSelect} />
              </div>
              <div className="block" data-cy="MainContent">
                {isLoading ? (
                  <Loader />
                ) : loadError ? (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Error loading posts. Please try again later.
                  </div>
                ) : !selectedUser ? (
                  <p data-cy="NoSelectedUser">No user selected</p>
                ) : posts.length === 0 ? (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                ) : (
                  <PostsList
                    posts={posts}
                    onPostSelect={handlePostSelect}
                    selectedPost={selectedPost}
                  />
                )}
              </div>
            </div>
          </div>
          <div
            data-cy="Sidebar"
            className={`tile is-parent is-8-desktop Sidebar ${selectedPost ? 'Sidebar--open' : ''}`}
          >
            <div className="tile is-child box is-success">
              {selectedPost ? (
                <PostDetails post={selectedPost} />
              ) : (
                <p>Post is not selected</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
