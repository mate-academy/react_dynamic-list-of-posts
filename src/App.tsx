import React, { useEffect, useState } from 'react';

import './App.scss';
import './styles/general.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { Loader } from './components/Loader';

import { getUserPosts } from './api/posts';
import { getUsers } from './api/Users';

const App: React.FC = () => {
  const [isError, setIsError] = useState(false);

  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(0);

  useEffect(() => {
    const loadPosts = async () => {
      return getUserPosts(selectedUserId);
    };

    const loadUsers = async () => {
      return getUsers();
    };

    Promise
      .all([loadPosts(), loadUsers()])
      .then(([postsFromServer, usersFromServer]) => {
        setPosts(postsFromServer);
        setUsers(usersFromServer);
      })
      .catch(() => setIsError(true));
  }, [selectedUserId]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(Number(event.target.value));
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const newPostId = Number(event.currentTarget.value);

    setSelectedPostId(
      newPostId === selectedPostId
        ? 0
        : newPostId,
    );
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={handleSelectChange}
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
          {isError
            ? (<h1>An error occurred</h1>)
            : (
              <>
                {posts.length === 0
                  ? (
                    <Loader />
                  )
                  : (
                    <PostsList
                      posts={posts}
                      selectedPostId={selectedPostId}
                      onButtonClick={handleButtonClick}
                    />
                  )}
              </>
            )}
        </div>

        <div className="App__content">
          {selectedPostId > 0 && (
            <PostDetails selectedPostId={selectedPostId} />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
