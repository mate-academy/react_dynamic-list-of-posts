import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUserPosts } from './api/posts';
import { getUsers } from './api/users';

const App: React.FC = () => {
  const [users, setUsers] = useState<UserWithPosts[] | null>(null);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(0);

  const selectPostId = (postId: number) => {
    setSelectedPostId(postId);
  };

  useEffect(() => {
    getUsers()
      .then((usersFromServer) => {
        const currentUsers = usersFromServer.slice(0, 10);

        const usersWithPosts = currentUsers.map((user: User) => {
          const currentUser: UserWithPosts = { ...user, posts: [] };

          getUserPosts(user.id)
            .then((postsFromServer) => {
              currentUser.posts = postsFromServer;
            });

          return currentUser;
        });

        setUsers(usersWithPosts);
      });
  }, []);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={(event) => setSelectedUserId(+event.target.value)}
          >
            <option value="0">All users</option>
            {users?.map((user) => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          {users
            && (
              <PostsList
                users={users}
                selectedUserId={selectedUserId}
                selectedPostId={selectedPostId}
                selectPostId={selectPostId}
              />
            )}
        </div>

        <div className="App__content">
          <PostDetails />
        </div>
      </main>
    </div>
  );
};

export default App;
