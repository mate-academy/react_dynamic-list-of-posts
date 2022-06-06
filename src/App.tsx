import React, { useEffect, useState } from 'react';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUsers } from './api/users';
import { getUserPosts } from './api/posts';
import { User } from './types/User';
import { Post } from './types/Post';
import './App.scss';
import './styles/general.scss';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedUser, setSelectedUser] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(0);

  const selectUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(+event.target.value);
  };

  const selectPostId = (postId: number) => {
    if (selectedPostId === postId) {
      setSelectedPostId(0);
    } else {
      setSelectedPostId(postId);
    }
  };

  useEffect(() => {
    getUsers()
      .then(data => setUsers(data));
  }, []);

  useEffect(() => {
    getUserPosts(selectedUser)
      .then(data => {
        if (selectedUser !== 0) {
          setPosts(data.filter(user => user.userId === selectedUser));
        } else {
          setPosts(data);
        }
      });
  }, [selectedUser]);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;
          <select
            className="App__user-selector"
            onChange={selectUser}
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
            posts={posts}
            selectedPostId={selectedPostId}
            selectPostId={selectPostId}
          />
        </div>
        <div className="App__content">
          <PostDetails
            selectedPostId={selectedPostId}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
