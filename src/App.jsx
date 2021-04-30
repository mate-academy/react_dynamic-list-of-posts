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
  const [selectedPostId, setSelectedPostId] = useState(0);
  const [isPostSelected, setIsPostSelected] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    getPosts()
      .then((postsFromServer) => {
        console.log(postsFromServer);

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
        setIsPostSelected={setIsPostSelected}
      />

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            selectedPostId={selectedPostId}
            setSelectedPostId={setSelectedPostId}
            userPosts={userPosts}
            isPostSelected={isPostSelected}
            setIsPostSelected={setIsPostSelected}
            setSelectedPost={setSelectedPost}
            selectedPost={selectedPost}
          />
        </div>

        {selectedPost && isPostSelected && (
          <div className="App__content">
            <PostDetails 
              selectedPostId={selectedPostId}
              selectedPost={selectedPost}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
