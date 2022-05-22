import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUsers } from './api/posts';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(0);
  const [isOpenPost, setIsOpenPost] = useState(false);

  useEffect(() => {
    getUsers()
      .then(allUsers => setUsers(allUsers));
  }, []);

  const handleUserSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value);
  };

  const saveSelectedPost = (postId: number) => {
    setSelectedPostId(postId);

    if (postId !== selectedPostId) {
      setIsOpenPost(true);
    } else {
      setIsOpenPost(false);
      setSelectedPostId(0);
    }
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={selectedUserId}
            onChange={handleUserSelect}
          >
            <option value="0">All users</option>
            {users.map(user => (
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
            selectedUser={selectedUserId}
            selectedPost={selectedPostId}
            saveSelectedPost={saveSelectedPost}
          />
        </div>

        <div className="App__content">
          {isOpenPost && (
            <PostDetails
              selectedPost={selectedPostId}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
