import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUsers } from './api/api';
import { getUserPosts } from './api/posts';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[] | null>([]);
  const [currentUserId, setCurrentUserId] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState<number>(0);
  const [posts, setPosts] = useState<Post[] | null>([]);

  const getUsersFromServer = async () => {
    try {
      const usersFromServer = await getUsers();

      setUsers(usersFromServer);
    } catch {
      setUsers([]);
    }
  };

  useEffect(
    () => {
      getUsersFromServer();
    },
    [],
  );
  const getPostsFromServer = async () => {
    try {
      const postsFromServer = await getUserPosts(currentUserId);

      setPosts(postsFromServer);
    } catch {
      setPosts([]);
    }
  };

  useEffect(
    () => {
      getPostsFromServer();
    },
    [currentUserId],
  );

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;
          <select
            className="App__user-selector"
            onChange={(event) => setCurrentUserId(+event.target.value)}
          >
            <option value="0">All users</option>
            {users?.map((user, index) => {
              // there were 1307 users in the API so I limitted to 10
              if (index < 10) {
                return (
                  <option
                    key={user.id}
                    value={user.id}
                  >
                    {user.name}
                  </option>
                );
              }

              return null;
            })}
          </select>
        </label>
      </header>
      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            selectedPostId={selectedPostId}
            setSelectedPostId={setSelectedPostId}
            posts={posts}
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
