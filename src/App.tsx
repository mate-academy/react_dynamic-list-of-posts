import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelect } from './components/UserSelect/UserSelect';
import { getAllPosts, getUserPosts } from './api/posts';
import { getAllUsers } from './api/users';

const App: React.FC = () => {
  const [selectedPostId, setSelectedPostId] = useState<number>(0);
  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const fetchAllUsers = async () => {
    const recievedUsers = await getAllUsers();

    setUsers(recievedUsers);
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllPosts = async () => {
    const recievedPosts = await getAllPosts();

    setPosts(recievedPosts);
  };

  const fetchUserPosts = async () => {
    const recievedPosts = await getUserPosts(selectedUserId);

    setPosts(recievedPosts);
  };

  useEffect(() => {
    if (!selectedUserId) {
      fetchAllPosts();
    } else {
      fetchUserPosts();
    }
  }, [selectedUserId]);

  return (
    <div className="App">
      <header className="App__header">
        <UserSelect
          users={users}
          setUserId={setSelectedUserId}
        />
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            posts={posts}
            postId={selectedPostId}
            setPostId={setSelectedPostId}
          />
        </div>

        <div className="App__content">
          <PostDetails postId={selectedPostId} />
        </div>
      </main>
    </div>
  );
};

export default App;
