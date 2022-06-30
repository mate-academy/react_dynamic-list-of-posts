import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUserPosts, getUsers } from './api/post';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPostId, setSelectedPostId] = useState(0);
  const [users, setUsers] = useState<User[]>([]);

  const showPosts = (userId?: number) => {
    getUserPosts(userId)
      .then(setPosts);
  };

  useEffect(() => {
    showPosts();
    getUsers()
      .then(usersFromServer => {
        setUsers(usersFromServer.slice(0, 10));
      });
  }, []);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={(event) => {
              showPosts(+event.target.value);
            }}
          >
            <option
              disabled
              defaultValue="Chose user"
            >
              Choose user
            </option>
            {users.map(user => (
              <option value={user.id} key={user.id}>
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
            getSelectedPost={setSelectedPostId}
          />
        </div>

        <div className="App__content">
          {!!selectedPostId
            && <PostDetails selectedPostId={selectedPostId} />}
        </div>
      </main>
    </div>
  );
};

export default App;
