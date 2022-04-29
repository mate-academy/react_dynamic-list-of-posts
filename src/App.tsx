import {
  ChangeEvent, FC, useEffect, useState,
} from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUsers } from './api/users';

const App: FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(0);
  const [isLoadPost, setIsLoadPost] = useState(true);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .then(() => {
        setIsLoadPost(false);
      });
  }, []);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value);
  };

  const selectPost = (id: number) => setSelectedPostId(id);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={selectedUserId}
            onChange={handleChange}
          >
            <option value="0">All users</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            userId={selectedUserId}
            onSelect={selectPost}
            selectedPostId={selectedPostId}
            isLoadPost={isLoadPost}
          />
        </div>

        {selectedPostId !== 0 && (
          <div className="App__content">
            <PostDetails
              postId={selectedPostId}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
