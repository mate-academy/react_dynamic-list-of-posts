import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUserPosts, getUsers } from './api/api';
import { UserSelect } from './components/UserSelect';

const App: React.FC = () => {
  const [posts, setPosts] = useState([]);
  const [postId, setPostId] = useState(0);

  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(0);

  useEffect(() => {
    const postsFromServer = async () => {
      setPosts(await getUserPosts(userId));
    };

    postsFromServer();
  }, [userId]);

  useEffect(() => {
    const usersFromServer = async () => {
      setUsers(await getUsers());
    };

    usersFromServer();
  }, []);

  return (
    <div className="App">
      <header className="App__header">
        <UserSelect
          users={users}
          selectedUser={userId}
          selectedUserId={setUserId}
        />
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            posts={posts}
            selectedPost={postId}
            selectedPostId={setPostId}
          />
        </div>

        <div className="App__content">
          <PostDetails
            selectedPost={postId}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
