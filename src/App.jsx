import React, { useCallback, useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getAllUsers, getUsersPosts } from './api/services';
import { Loader } from './components/Loader';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('0');
  const [isLoad, setIsLoad] = useState(false);
  const [postId, setPostId] = useState(0);

  useEffect(() => {
    setIsLoad(true);
    getAllUsers('/users')
      .then((response) => {
        setUsers(response.data.filter(user => user.id <= 11));
        setIsLoad(false);
      })
      .catch(err => err);
  }, []);

  useEffect(() => {
    getUsersPosts('/posts')
      .then((response) => {
        setPosts(response.data);
        setIsLoad(false);
      })
      .catch(err => err);
  }, []);

  const onSelectUser = useCallback((e) => {
    const userId = e.target.value;

    setSelectedUser(userId);
    setIsLoad(true);
    getUsersPosts('/posts')
      .then((response) => {
        +userId
          ? setPosts(response.data.filter(post => post.userId === +userId))
          : setPosts(response.data);
        setIsLoad(false);
      })
      .catch(err => err);
  }, []);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={selectedUser}
            onChange={onSelectUser}
          >
            <option value="0">All users</option>
            {users
              .sort((a, b) => a.id - b.id)
              .map(user => (
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
          {!isLoad
            ? (
              <PostsList
                posts={posts}
                userId={selectedUser}
                fetchPostId={setPostId}
              />
            )
            : <Loader />
          }
        </div>

        {postId !== 0
          && (
            <div className="App__content">
              <PostDetails
                postId={postId}
              />
            </div>
          )
        }
      </main>
    </div>
  );
};

export default App;
