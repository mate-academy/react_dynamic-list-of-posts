import React, {
  ChangeEvent, useEffect, useMemo, useState,
} from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUserPosts, getPosts, getUsers } from './api/posts';
import { Post } from './types/Post';
import { User } from './types/User';

const App: React.FC = () => {
  const [value, setValue] = useState(0);
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const selectHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    setValue(+event.target.value);
    setSelectedPostId(null);
  };

  useEffect(() => {
    getPosts()
      .then(res => setPosts(res));
    getUsers()
      .then(res => setUsers(res));
  }, []);

  useMemo(() => {
    if (value === 0) {
      getPosts()
        .then(res => setPosts(res));
    } else {
      getUserPosts(value)
        .then(res => setPosts(res));
    }
  }, [value]);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={value}
            onChange={selectHandler}
          >
            <option value="0">All users</option>
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
            setSelectedPostId={(id: number | null) => setSelectedPostId(id)}
            selectedPostId={selectedPostId}
          />
        </div>

        <div className="App__content">
          {selectedPostId && (
            <PostDetails selectedPostId={selectedPostId} />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
