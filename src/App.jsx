import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { getUsers } from './api/users';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';

const App = () => {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(0);
  const [selectedPost, setPost] = useState({});

  useEffect(() => {
    getUsers()
      .then((usersFromServer) => {
        // eslint-disable-next-line
        const usersOnPage = usersFromServer.filter(({ id }) => id <= 10);

        setUsers(usersOnPage.map(({ name, id }) => ({
          name, id,
        })));
      });
  }, []);

  const handleClick = (post) => {
    setPost(post);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={userId}
            onChange={(e) => {
              setUserId(+e.currentTarget.value);
            }}
          >
            <option value="0">All users</option>
            {users.map(({ name, id }) => (
              <option
                key={id}
                value={id}
              >
                {name}
              </option>
            ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            setPost={setPost}
            selectedPost={selectedPost}
            handleClick={handleClick}
            userId={userId}
          />
        </div>

        {selectedPost.id && (
          <div className="App__content">
            <PostDetails post={selectedPost} />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
