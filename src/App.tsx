import React, { useEffect, useState } from 'react';
import { User, Post } from './react-app-env';
import { getPosts, getUserPosts } from './api/posts';
import { getUsers } from './api/users';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';

import './styles/general.scss';
import './App.scss';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<number>(0);

  const requestUsers = async () => {
    try {
      const usersFromServer = await getUsers();

      setUsers(usersFromServer.slice(0, 10));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  const requestPosts = async () => {
    try {
      const postsFromServer = await getPosts();

      setPosts(postsFromServer);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  useEffect(() => {
    requestUsers();
    requestPosts();
  }, []);

  const handleSelectedPostId = (postId: number) => {
    setSelectedPostId(postId);
  };

  const handleSelect = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const userPost = await getUserPosts(Number(event.target.value));

    setPosts(userPost);

    if (+event.target.value === 0) {
      requestPosts();
    }
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          {'Select a user: '}

          <select
            className="App__user-selector"
            onChange={handleSelect}
          >
            <option value={selectedPostId}>
              All users
            </option>

            {users.map(user => (
              <option value={user.id} key={user.id}>
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
            onSelectPostId={handleSelectedPostId}
            selectedPostId={selectedPostId}
          />
        </div>

        <div className="App__content">
          {selectedPostId !== 0 && (
            <PostDetails selectedPostId={selectedPostId} />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
