import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUsers } from './api/posts';

const App = () => {
  const [users, setUser] = useState([]);
  const [selectUserId, setSelectUser] = useState(0);
  const [postId, setPostId] = useState(0);
  const [isSelectedPost, setIsSelectedPost] = useState(false);

  const findUserPost = (event) => {
    const { value } = event.target;

    setSelectUser(value);
  };

  const selectedPostId = (isSelectPostId, selectPostId) => {
    setIsSelectedPost(isSelectPostId);
    setPostId(selectPostId);
  };

  useEffect(() => {
    getUsers()
      .then(setUser);
  }, []);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            name="selectUserId"
            value={selectUserId}
            onChange={event => findUserPost(event)}
          >
            <option value="0">All users</option>
            {users.map(user => (
              <option
                key={user.id}
                value={user.id}
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
            selectUserId={Number(selectUserId)}
            selectedPostId={selectedPostId}
          />
        </div>

        {isSelectedPost && (
          <div className="App__content">
            <PostDetails
              postId={postId}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
