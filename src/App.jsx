import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUsers } from './api/users';
import { Header } from './components/Header';

const App = () => {
  const [selector, setSelector] = useState('');
  const [users, setUsers] = useState([]);
  const [detailsVisible, setDetailsVisible] = useState(true);
  const [postId, setPostId] = useState(0);

  useEffect(() => {
    getUsers()
      .then(result => result.filter(user => user.name !== null))
      .then(result => setUsers(result));
  }, []);

  return (
    <div className="App">
      <Header
        selector={selector}
        setSelector={setSelector}
        users={users}
      />
      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            selector={selector}
            setDetailsVisible={setDetailsVisible}
            setPostId={setPostId}
          />
        </div>

        <div className="App__content " hidden={detailsVisible}>
          <PostDetails postId={postId} />
        </div>
      </main>
    </div>
  );
};

export default App;
