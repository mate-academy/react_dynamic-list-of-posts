import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUsers } from './api/users';
import { Post, User } from './react-app-env';
import { getUsersPosts } from './api/posts';

const App: React.FC = () => {
  const [selectedPostId, setSelectedPostId] = useState(0);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getUsers()
      .then(usersFromServer => setUsers(usersFromServer));

    getUsersPosts(selectedUserId)
      .then(postsFromServer => setPosts(postsFromServer));
  }, [selectedUserId]);

  const setPostId = (postId: number) => {
    setSelectedPostId(postId);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={selectedUserId}
            onChange={event => setSelectedUserId(+event.target.value)}
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
            selectPostId={selectedPostId}
            onSelectedPostId={setPostId}
          />
        </div>

        {selectedPostId !== 0 && (
          <div className="App__content">
            <PostDetails selectedPostId={selectedPostId} />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
