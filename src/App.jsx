import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUsers } from './api/posts';

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setUserId] = useState('');
  // const [postId, setPostId] = useState(null);
  const setPostId = () => 0;

  // console.log(1, 0, posts);

  useEffect(() => {
    // console.log('getUsers');
    getUsers()
      .then(data => setUsers(data));
  });

  const handleChange = (e) => {
    const { value } = e.target;

    setUserId(value);
  };

  // useEffect(() => {
  //   const fetchedData = async () => {
  //     const result = await getUserPosts(1);

  //     console.log(result.response);
  //   };

  //   console.log(typeof fetchedData);

  //   setPosts(fetchedData);
  // }, []);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            name="user"
            className="App__user-selector"
            value={selectedUserId}
            onChange={handleChange}
          >
            <option value="">
              Choose a user
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
            userId={+selectedUserId}
            setPostId={setPostId}
          />
        </div>

        <div className="App__content">
          <PostDetails />
        </div>
      </main>
    </div>
  );
};

export default App;
