import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getPosts } from './api/posts';
import { Header } from './components/Header';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [userId, setUserId] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState('');

  useEffect(() => {
    getPosts()
      .then((postsFromServer) => {
        setPosts(postsFromServer);
        setUserPosts(postsFromServer);
      });
  }, []);

  return (
    <div className="App">
      <Header
        posts={posts}
        userId={userId}
        setUserId={setUserId}
        setUserPosts={setUserPosts}
      />

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            selectedPostId={selectedPostId}
            setSelectedPostId={setSelectedPostId}
            userPosts={userPosts}
          />
        </div>

        <div className="App__content">
          <PostDetails />
        </div>
      </main>
    </div>
  );
};

export default App;
