import React, { useState, useEffect } from 'react';
import './App.scss';
import { getPosts, getUsers } from './api/api';

import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUserPosts } from './api/posts';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Posts[]>();
  const [users, setUsers] = useState<User[]>();

  const [selectValue, setSelectValue] = useState('');
  const [selectedPostId, setSeletedPostId] = useState<number>();

  const getPostsFromServer = async () => {
    const postFromServer = await getPosts();

    setPosts(postFromServer);
  };

  const getUsersFromServer = async () => {
    const postUsersServer = await getUsers();

    setUsers(postUsersServer);
  };

  useEffect(() => {
    getPostsFromServer();
    getUsersFromServer();
  }, []);

  useEffect(() => {
    if (selectValue !== 'all' && selectValue) {
      getUserPosts(+selectValue).then(post => setPosts(post));
    }

    if (selectValue === 'all') {
      getPostsFromServer();
    }
  }, [selectValue]);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            value={selectValue}
            onChange={(event) => {
              setSelectValue(event.target.value);
            }}
            className="App__user-selector"
          >

            <option value="all">All users</option>

            {users?.map(user => (
              <option key={user.id} value={`${user.id}`}>
                {user.name}
              </option>
            ))}

          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          {posts
            ? (
              <PostsList
                posts={posts}
                setSeletedPostId={setSeletedPostId}
              />
            )
            : 'loading...'}
        </div>

        <div className="App__content">
          {selectedPostId
            ? (
              <PostDetails
                selectedPostId={selectedPostId}
              />
            )
            : 'No details'}
        </div>
      </main>
    </div>
  );
};

export default App;
