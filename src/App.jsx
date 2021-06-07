import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getPosts } from './api/posts';
import { getUsers } from './api/api';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(0);
  const [chooseUser, setChooseUser] = useState('0');

  useEffect(() => {
    getPosts().then(result => setPosts(result));
    getUsers().then(people => (
      setUsers(people.filter(person => person.address !== null))
    ));
  }, []);

  const changeUser = ({ target }) => {
    setChooseUser(target.value);
  };

  const sortPost = posts.filter((post) => {
    switch (chooseUser) {
      case '0':
        return post;
      default:
        return post.userId === +chooseUser;
    }
  });

  const showDetails = (postId) => {
    if (postId === selectedPostId) {
      setSelectedPostId(0);
    } else {
      setSelectedPostId(postId);
    }
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;
          <select
            className="App__user-selector"
            value={chooseUser}
            onChange={changeUser}
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
            posts={sortPost}
            selectedPostId={selectedPostId}
            postSelect={showDetails}
          />
        </div>

        <div className="App__content">
          <PostDetails selectedPostId={selectedPostId} />
        </div>
      </main>
    </div>
  );
};

export default App;
