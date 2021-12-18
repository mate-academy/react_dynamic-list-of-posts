/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUsers, getUserPosts } from './api/posts';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[] | null>(null);
  const [selectedPostId, setSelectedPostId] = useState<number>(0);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const postsFromServer = await getUserPosts();
        const usersFromServer = await getUsers();

        setUsers(usersFromServer);
        setPosts(postsFromServer);
      } catch (error) {
        console.error(error);
      }
    }

    fetchPosts();
  }, []);

  const filterPostsByUserid = async (e: { target: { value: string; }; }) => {
    const id = +e.target.value;

    const filteredPosts = await getUserPosts(id);

    setPosts(filteredPosts);
  };

  const handleSetPostId = (id:number) => {
    setSelectedPostId(id);
  };

  // console.log(selectedPostId);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={filterPostsByUserid}
          >
            <option value="0">All users</option>
            {users && users.map(user => (
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
            handleSetPostId={handleSetPostId}
            selectedPostId={selectedPostId}
          />
        </div>

        <div className="App__content">
          {selectedPostId !== 0 && <PostDetails id={selectedPostId} />}
        </div>
      </main>
    </div>
  );
};

export default App;
