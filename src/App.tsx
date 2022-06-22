import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUserPosts } from './api/posts';
import { getUsers } from './api/users';

const App: React.FC = () => {
  const [users, setUsers] = useState<UserWithPosts[] | null>(null);

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

          <select className="App__user-selector">
            <option value="0">All users</option>
            <option value="1">Leanne Graham</option>
            <option value="2">Ervin Howell</option>
            <option value="3">Clementine Bauch</option>
            <option value="4">Patricia Lebsack</option>
            <option value="5">Chelsey Dietrich</option>
            <option value="6">Mrs. Dennis Schulist</option>
            <option value="7">Kurtis Weissnat</option>
            <option value="8">Nicholas Runolfsdottir V</option>
            <option value="9">Glenna Reichert</option>
            <option value="10">Leanne Graham</option>
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          {users && <PostsList users={users} />}
        </div>

        <div className="App__content">
          <PostDetails />
        </div>
      </main>
    </div>
  );
};

export default App;
