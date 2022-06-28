import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUserPosts, getUsers } from './api/api';

const App: React.FC = () => {
  const [userId, setUserId] = useState(0);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  const [postId, setPostId] = useState(0);

  const settingPostId = (id: number) => {
    setPostId(id);
  };

  useEffect(() => {
    getUsers()
      .then(usersFromServer => {
        setAllUsers(usersFromServer);
      });
  }, []);

  useEffect(() => {
    getUserPosts(userId)
      .then(postsFromServer => {
        setPosts(postsFromServer);
      });
  }, [userId]);

  // eslint-disable-next-line no-console
  console.log(allUsers, posts);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={userId}
            onChange={(event) => {
              setUserId(+event.target.value);
            }}
          >
            <option value={0}>All users</option>

            {allUsers.map(serverUser => (
              <option
                value={serverUser.id}
                key={serverUser.id}
              >
                {`${serverUser.name}`}
              </option>
            ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            posts={posts}
            settingPostId={settingPostId}
            postId={postId}
          />
        </div>
        {!!postId && (
          <div className="App__content">
            <PostDetails
              postId={postId}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
