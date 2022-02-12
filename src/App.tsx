import React, { useState, useEffect, useCallback } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getPosts, getUserPosts } from './api/posts';
import { getUsers } from './api/users';
import { Loader } from './components/Loader';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectUserId, setSelectUserId] = useState(0);
  const [selectPostId, setSelectPostId] = useState(0);
  const [isLoader, setLoader] = useState(false);

  const loadPosts = async () => {
    const postsFromServer = await getPosts();

    setPosts(postsFromServer);
  };

  const loadPostsByUserId = async () => {
    const postsFromServer = await getUserPosts(selectUserId);

    setPosts(postsFromServer);
  };

  const loadUsers = async () => {
    const usersFromServer = await getUsers();

    setUsers(usersFromServer);
  };

  const loadAllData = async () => {
    setLoader(true);
    await loadPosts();
    await loadUsers();
    setLoader(false);
  };

  useEffect(() => {
    loadAllData();
  }, []);

  useEffect(() => {
    if (selectUserId !== 0) {
      loadPostsByUserId();
    } else {
      loadPosts();
    }
  }, [selectUserId]);

  const hendlerSelect = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectUserId(+event.target.value);
  }, []);

  const hendlerOpenDetails = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setSelectPostId(+event.currentTarget.value);
  }, []);

  if (isLoader) {
    return (
      <Loader />
    );
  }

  return (
    <div className="App">
      <header className="App__header">
        <label htmlFor="select_app">
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            id="select_app"
            value={selectUserId}
            onChange={hendlerSelect}
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
            onDetails={hendlerOpenDetails}
            postId={selectPostId}
          />
        </div>

        <div className="App__content">
          <PostDetails postId={selectPostId} />
        </div>
      </main>
    </div>
  );
};

export default App;
