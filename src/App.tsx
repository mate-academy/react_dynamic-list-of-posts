import React, { useEffect, useState } from 'react';

import './App.scss';
import './styles/general.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getAllUsers } from './api/users';
import { getAllPosts, getUserPosts } from './api/posts';

import { Loader } from './components/Loader';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [postId, setPostId] = useState(0);
  const [selectedUserId, setSelectedUserId] = useState(0);

  const fetchUsers = async () => {
    setIsLoading(true);

    const usersFromServer = await getAllUsers();

    setUsers(usersFromServer);
  };

  const fetchPosts = async () => {
    const postsFromServer = await getAllPosts();

    setPosts(postsFromServer);
    setIsLoading(false);
  };

  const fetchUserPosts = async () => {
    setIsLoading(true);
    const postsUsersFromServer = await getUserPosts(selectedUserId);

    setPosts(postsUsersFromServer);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedUserId === 0) {
      fetchPosts();
    } else {
      fetchUserPosts();
    }
  }, [selectedUserId]);

  return (
    <div className="App">
      <header className="App__header">
        <label htmlFor="user-selector">
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            id="user-selector"
            value={selectedUserId}
            onChange={(event) => setSelectedUserId(+event.target.value)}
          >
            <option value="0">All users</option>
            {users.map(user => (
              <option value={user.id}>{user.name}</option>
            ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          {isLoading
            ? <Loader />
            : (
              <PostsList
                posts={posts}
                postId={postId}
                setPostId={setPostId}
              />
            )}
        </div>

        <div className="App__content">
          {postId !== 0
            && <PostDetails postId={postId} />}
        </div>
      </main>
    </div>
  );
};

export default App;
