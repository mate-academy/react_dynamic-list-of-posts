import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getPosts, getUserPosts, getUsers } from './api/posts';

interface User {
  name: string;
  id: number;
}

const App: React.FC = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectUser, setSelectUser] = useState(0);
  const [postId, setPostId] = useState(0);

  const changePostId = (id: number) => {
    setPostId(id);
  };

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  useEffect(() => {
    if (!selectUser) {
      getPosts().then(setPosts);
    } else {
      getUserPosts(selectUser).then(setPosts);
    }
  }, [selectUser]);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={(event) => {
              setSelectUser(+event.target.value);
            }}
          >
            <option value="0">All users</option>
            {users.map((user: User) => (
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
            posts={posts}
            postId={postId}
            changePostId={changePostId}
          />
        </div>

        <div className="App__content">
          {postId === 0
            ? 'Not select Post'
            : (
              <PostDetails postId={postId} />
            )}
        </div>
      </main>
    </div>
  );
};

export default App;
