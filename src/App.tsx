import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUsers } from './api/users';
import { getPosts } from './api/posts';

type User = {
  id: number;
  name: string;
};

type Post = {
  id: number;
  userId: number;
  title: string;
  selectedPostId: number;
};

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [selectedPostId, setSelectedPostId] = useState(0);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getPosts()
      .then((responce) => {
        let res = responce;

        if (selectedUserId !== '') {
          res = res.filter((el: Post) => el.userId === +selectedUserId);
        }

        setPosts(res);
      });
  }, [selectedUserId]);

  useEffect(() => {
    getUsers()
      .then(responce => setUsers(responce));
  }, []);

  const usersListItems = users.map(user => (
    <>
      <option value={user.id}>
        {user.name}
      </option>
    </>
  ));

  return (
    <div className="App">
      <header className="App__header">
        <label
          htmlFor="App__user-selector"
        >
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={selectedUserId}
            onChange={(event) => setSelectedUserId(event.target.value)}
          >
            <option value="">
              All users
            </option>
            {usersListItems}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            setSelectedPostId={setSelectedPostId}
            selectedPostId={selectedPostId}
            posts={posts}
          />
        </div>

        <div className="App__content">
          {selectedPostId !== 0
          && <PostDetails selectedPostId={selectedPostId} />}
        </div>
      </main>
    </div>
  );
};

export default App;
