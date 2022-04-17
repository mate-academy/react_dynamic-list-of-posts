/* eslint-disable no-console */
import { FC, useEffect, useState } from 'react';

import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getPosts, getUsers } from './api/posts';

const App: FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState(0);
  const [
    selectedUserId,
    // setSelectedUserId,
  ] = useState(0);
  const [
    selectedPostId,
    setSelectedPostId,
  ] = useState(0);

  // const getSelectedUser = (userId: number) => setSelectedUserId(userId);

  const getSelectedPost = (postId: number) => setSelectedPostId(postId);

  // const onClearUser = () => {
  //   setSelectedUserId(0);
  // };

  const onSelectUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(+event.target.value);
  };

  useEffect(() => {
    getPosts().then(data => setPosts(data));
  }, []);

  useEffect(() => {
    getUsers().then(data => setUsers(data));
  }, []);

  console.log('selectedUser', selectedUser);

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
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
            {/* <option value="1">Leanne Graham</option>
            <option value="2">Ervin Howell</option>
            <option value="3">Clementine Bauch</option>
            <option value="4">Patricia Lebsack</option>
            <option value="5">Chelsey Dietrich</option>
            <option value="6">Mrs. Dennis Schulist</option>
            <option value="7">Kurtis Weissnat</option>
            <option value="8">Nicholas Runolfsdottir V</option>
            <option value="9">Glenna Reichert</option>
            <option value="10">Leanne Graham</option> */}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            posts={posts}
            selectedId={selectedUserId}
            selectPost={getSelectedPost}
          />
        </div>

        <div className="App__content">
          {!!selectedPostId && (
            <PostDetails
              // onSelectPost={getSelectedPost}
              selectPostId={selectedPostId}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
