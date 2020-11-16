import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { usersDataFromServer } from './api/post';

const App = () => {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(0);

  useEffect(() => {
    usersDataFromServer()
      .then((user) => {
        setUsers(user.slice(0, 10));
      });
  }, []);

  const selectUserId = ({ target }) => {
    setUserId(+target.value);
  };

  const openDetails = (postId) => {
    if (postId === selectedPostId) {
      setSelectedPostId(0);

      return;
    }

    setSelectedPostId(postId);
  };

  // console.log(selectedPostId);
  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={userId}
            onChange={selectUserId}
          >
            <option value="0">All users</option>
            {
              users.map((user, index) => (
                <option value={index + 1} key={user.name}>{user.name}</option>
              ))
            }
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            userId={userId}
            openDetails={openDetails}
            selectedPostId={selectedPostId}
          />
        </div>

        <div className="App__content">
          {
            selectedPostId === 0
              ? <h4>Choose post to see details</h4>
              : <PostDetails postId={selectedPostId} />
          }
        </div>
      </main>
    </div>
  );
};

export default App;
