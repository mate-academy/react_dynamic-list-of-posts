import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getAllPosts, getUserPosts } from './api/posts';
import { getAllUsers } from './api/users';

const App: React.FC = () => {
  const [posts, setPosts] = useState([]);
  const [userSelector, setUserSelector] = useState(0);
  const [selectedPostId, setselectedPostId] = useState(0);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (userSelector === 0) {
      getAllPosts()
        .then(responce => {
          setPosts(responce);
        });
    } else {
      getUserPosts(userSelector)
        .then(responce => {
          setPosts(responce);
        });
    }
  }, [userSelector]);

  useEffect(() => {
    getAllUsers()
      .then(responce => {
        setUsers(responce);
      });
  }, [users]);

  const handleChange = (event: any) => {
    setUserSelector(event.target.value);
  };

  const selectPostId = (id: number) => {
    setselectedPostId(id);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label htmlFor="user-selector">
          Select a user: &nbsp;

          <select className="App__user-selector" id="user-selector" value={userSelector} onChange={handleChange}>
            <option value="0">All users</option>
            {users.map((user: any) => {
              return (
                <option value={user.id} key={user.id}>{user.name}</option>
              );
            })}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList posts={posts} selectPostId={selectPostId} selectedPostId={selectedPostId} />
        </div>

        <div className="App__content">
          {selectedPostId !== 0 && (
            <PostDetails selectedPostId={selectedPostId} />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
