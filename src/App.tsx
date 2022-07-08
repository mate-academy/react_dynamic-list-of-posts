import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getPosts } from './api/posts';
import { getUsers } from './api/users';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPostId, setSelectedPostId] = useState(0);
  const [userId, setUserId] = useState(0);
  const [users, setUsers] = useState<User[]>([]);

  const changeOpenPost = (value: number) => {
    setSelectedPostId(value);
  };

  const getAllPosts = async () => {
    setPosts(await getPosts(userId));
  };

  const getAllUsers = async () => {
    setUsers(await getUsers());
  };

  useEffect(() => {
    getAllPosts();
    getAllUsers();
  }, []);

  useEffect(() => {
    getAllPosts();
  }, [userId]);

  return (
    <div className="App">
      <header className="App__header">
        <label htmlFor="user-selector">
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            id="user-selector"
            value={userId}
            onChange={(event) => {
              setUserId(+event.target.value);
            }}
          >
            <option value="0">All users</option>
            {users.map((user) => (
              <option value={user.id}>{user.name}</option>
            ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            posts={posts}
            openPost={selectedPostId}
            setOpenPost={changeOpenPost}
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
