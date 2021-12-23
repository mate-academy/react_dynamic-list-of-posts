/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUsers, getUserPosts } from './api/posts';
import { Loader } from './components/Loader';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[] | null>(null);
  const [selectedPostId, setSelectedPostId] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function fetchPosts() {
      try {
        const postsFromServer = await getUserPosts();
        const usersFromServer = await getUsers();

        setUsers(usersFromServer);
        setPosts(postsFromServer);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    }

    fetchPosts();
  }, []);

  const filterPostsByUserid = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = +e.target.value;

    const filteredPosts = await getUserPosts(id);

    setPosts(filteredPosts);
  };

  const handleSetPostId = (id:number) => {
    setSelectedPostId(id);
  };

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
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          {isLoading ? (<Loader />) : (
            <PostsList
              posts={posts}
              handleSetPostId={handleSetPostId}
              selectedPostId={selectedPostId}
            />
          )}
        </div>

        {selectedPostId !== 0 && (
          <div className="App__content">
            <PostDetails id={selectedPostId} />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
