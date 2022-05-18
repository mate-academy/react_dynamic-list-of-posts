import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getAllPosts, getUserPosts } from './api/posts';
import { getAllUsers } from './api/users';
import { User } from './types/User';
import { Post } from './types/Post';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersFromServer = await getAllUsers();

        setUsers(usersFromServer);
      } catch {
        Promise.reject(new Error('error'));
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      const postsFromServer = await getAllPosts();

      setPosts(postsFromServer);
    };

    const fetchUserPosts = async () => {
      const userPosts = await getUserPosts(selectedUserId);

      setPosts(userPosts);
    };

    try {
      (selectedUserId === 0 ? fetchPosts : fetchUserPosts)();
    } catch {
      Promise.reject(new Error('error'));
    }
  }, [selectedUserId]);

  return (
    <div className="App">
      <header className="App__header">
        <label htmlFor="userSelector">
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            id="userSelector"
            value={selectedUserId}
            onChange={(event) => {
              setSelectedUserId(+event.target.value);
              setSelectedPostId(0);
            }}
          >
            <option value="0">All users</option>
            {users.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            posts={posts}
            selectedPostId={selectedPostId}
            setSelectedPostId={setSelectedPostId}
          />
        </div>

        <div className="App__content">
          {selectedPostId ? (
            <PostDetails
              selectedPostId={selectedPostId}
            />
          ) : (
            <></>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
