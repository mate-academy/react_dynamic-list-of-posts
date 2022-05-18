import React, { useState, useEffect } from 'react';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelect } from './components/UserSelect/UserSelect';
import { Loader } from './components/Loader';

import { getAllPosts, getUserPosts } from './api/posts';
import { getAllUsers } from './api/users';

import './App.scss';
import './styles/general.scss';

const App: React.FC = () => {
  const [selectedPostId, setSelectedPostId] = useState<number>(0);
  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isPostsLoaded, setIsPostsLoaded] = useState(false);

  const fetchAllUsers = async () => {
    const recievedUsers = await getAllUsers();

    setUsers(recievedUsers);
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllPosts = async () => {
    const recievedPosts = await getAllPosts();

    setIsPostsLoaded(true);
    setPosts(recievedPosts);
  };

  const fetchUserPosts = async () => {
    const recievedPosts = await getUserPosts(selectedUserId);

    setIsPostsLoaded(true);
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
          {isPostsLoaded ? (
            <PostsList
              posts={posts}
              postId={selectedPostId}
              setPostId={setSelectedPostId}
            />
          ) : (
            <Loader />
          )}
        </div>

        <div className="App__content">
          {selectedPostId !== 0 && (
            <PostDetails postId={selectedPostId} />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
