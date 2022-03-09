import React, { useEffect, useState } from 'react';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { Loader } from './components/Loader';

import { Post } from './types/Post';
import { User } from './types/User';
import { SelectedPostId } from './types/SelectedPostId';

import { getAllPosts, getUserPosts } from './api/posts';
import { getAllUsers } from './api/users';

import './App.scss';
import './styles/general.scss';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<SelectedPostId>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllPosts()
      .then(postsFromServer => setPosts(postsFromServer))
      .then(() => setLoading(false));

    getAllUsers()
      .then(usersFromServer => setUsers(usersFromServer));
  }, []);

  const onUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value) {
      getUserPosts(+event.target.value)
        .then(postsFromServer => setPosts(postsFromServer));
    } else {
      getAllPosts()
        .then(postsFromServer => setPosts(postsFromServer));
    }
  };

  return (
    <div className="App">
      <header className="App__header">
        <label htmlFor="user-select">
          Select a user: &nbsp;

          <select
            id="user-select"
            className="App__user-selector"
            onChange={onUserChange}
          >
            <option value="">All users</option>
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
          {loading ? (
            <Loader />
          ) : (
            <PostsList
              posts={posts}
              selectedPostId={selectedPostId}
              setSelectedPostId={setSelectedPostId}
            />
          )}
        </div>

        <div className="App__content">
          {selectedPostId !== null && <PostDetails selectedPostId={selectedPostId} />}
        </div>
      </main>
    </div>
  );
};

export default App;
