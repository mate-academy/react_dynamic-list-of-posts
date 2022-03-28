/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { getPosts } from './api/posts';
import { getUsers } from './api/users';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPostId, setSelectedPostId] = useState(0);

  useEffect(() => {
    getPosts()
      .then(response => setPosts(response));
  }, []);
  console.log(posts); // NEED TO DELETE

  useEffect(() => {
    getUsers()
      .then(response => setUsers(response));
  }, []);

  const onUserChoice = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value);
  };

  console.log(selectedUserId); // NEED TO DELETE
  console.log(selectedPostId); // NEED TO DELETE

  return (
    <div className="App">
      <header className="App__header">
        <label htmlFor="temp-id">
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            id="temp-id"
            onChange={onUserChoice}
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
          <PostDetails />
        </div>
      </main>
    </div>
  );
};

export default App;
