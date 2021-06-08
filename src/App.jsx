import React, { useState, useEffect } from 'react';

import './App.scss';
import './styles/general.scss';

import { getPosts, getUserPosts } from './api/posts';
import { getUsers } from './api/users';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);

  useEffect(() => {
    getPosts()
      .then(setPosts);
    getUsers()
      .then(setUsers);
  }, []);

  const selectedUserPosts = ({ target }) => {
    if (+target.value === 0) {
      getPosts()
        .then(data => setPosts(data));
    }

    getUserPosts(target.value)
      .then(data => setPosts(data));
  };

  const onSelectedPostId = (postId) => {
    if (postId === selectedPostId) {
      return setSelectedPostId(0);
    }

    setSelectedPostId(postId)
  };  

  return (    
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={selectedUserPosts}
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
            onSelectedPostId={onSelectedPostId}
          />
        </div>


        {selectedPostId &&
          <div className="App__content">
            <PostDetails selectedPostId={selectedPostId}/>
          </div>
        }
      </main>
    </div>
  );
};

export default App;
