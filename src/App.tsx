import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUsers } from './api/users';

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const [selectedPostId, setSelectedPostId] = useState<number>(0);
  const [post, setPost] = useState<Post | null>(null);
  const [users, setUsers] = useState<User[] | null>(null);

  const getUsersFromServer = async () => {
    try {
      const response = await getUsers();

      setUsers(response);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  useEffect(() => {
    getUsersFromServer();
  }, []);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={selectedUserId}
            onChange={event => {
              setSelectedUserId(+event.target.value);
            }}
          >
            <option value="0">All users</option>

            {users?.map(user => (
              <option
                key={user.id}
                value={user.id}
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
            selectedUserId={selectedUserId}
            selectedPostId={selectedPostId}
            setSelectedPostId={setSelectedPostId}
            setPost={setPost}
          />
        </div>

        <div className="App__content">
          {post === null
            ? <h2>Here will be post details</h2>
            : <PostDetails post={post} />}
        </div>
      </main>
    </div>
  );
};

export default App;
