import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { User } from './types/Users';
import { getUserPosts, getUsers } from './api/posts';
import { Post } from './types/Posts';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPostsId, setSelectedPostsId] = useState(0);

  const showPosts = (userId?: number) => {
    getUserPosts(userId)
      .then(setPosts);
  };

  useEffect(() => {
    showPosts();
    getUsers()
      .then(serverUser => {
        setUsers(serverUser.slice(0, 15));
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
              selected
              disabled
              defaultValue="Chose user"
            >
              Chose user
            </option>
            {users.map(user => (
              <option value={user.id}>
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
            selectedPostsId={selectedPostsId}
            setSelectedPostsId={setSelectedPostsId}
          />
        </div>

        <div className="App__content">
          {!!selectedPostsId
          && <PostDetails selectedPostsId={selectedPostsId} />}
        </div>
      </main>
    </div>
  );
};

export default App;
