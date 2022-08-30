import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getPosts, getUserPosts } from './api/posts';
import { User } from './types/User';
import { getUsers } from './api/users';
import { Post } from './types/Post';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedPostId, setSelectedPostId] = useState(0);

  useEffect(() => {
    (async function fetchData() {
      const [fetchedPosts, fetchedUsers] = await Promise.all([
        getPosts(),
        getUsers(),
      ]);

      setPosts(fetchedPosts);
      setUsers(fetchedUsers);
    }());
  }, []);

  const handleSelect = async (value: string) => {
    if (value === 'All users') {
      return;
    }

    const newPosts = await getUserPosts(+value);

    setPosts(newPosts);
  };

  const handleClick = (value: number) => {
    if (value === selectedPostId) {
      setSelectedPostId(0);

      return;
    }

    setSelectedPostId(value);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={(e) => {
              handleSelect(e.currentTarget.value);
            }}
          >
            <option value="0">All users</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            posts={posts}
            selectedPostId={selectedPostId}
            handleClick={handleClick}
          />
        </div>

        {selectedPostId !== 0
          && (
            <div className="App__content">
              <PostDetails postId={selectedPostId} />
            </div>
          )}
      </main>
    </div>
  );
};

export default App;
