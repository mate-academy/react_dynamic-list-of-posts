import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelect } from './components/UserSelect';
import { getUsers } from './api/users';
import { getPosts, getUserPosts } from './api/posts';

const App = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [selectedUser, setSelectedUser] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(0);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  const handleChange = ({ target }) => {
    setSelectedUser(+target.value);
  };

  useEffect(() => {
    if (selectedUser !== 0) {
      getUserPosts(selectedUser).then(setPosts);
    } else {
      getPosts().then(setPosts);
    }
  }, [selectedUser]);

  const onselectedPostDetails = (postId) => {
    if (selectedPostId === postId) {
      setSelectedPostId(0);
    } else {
      setSelectedPostId(postId);
    }
  };

  return (
    <div className="App">
      <header className="App__header">
        <UserSelect
          users={users}
          onChange={handleChange}
        />
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            posts={posts}
            selectedPostId={selectedPostId}
            onselectedPostDetails={onselectedPostDetails}
          />
        </div>

        <div className="App__content">
          <PostDetails
            postId={selectedPostId}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
