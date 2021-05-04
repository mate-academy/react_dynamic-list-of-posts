import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getPosts } from './api/posts';
import { Header } from './components/Header';
import { Loader } from './components/Loader/Loader';

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
        setSelectedPost={setSelectedPost}
        setSelectedPostId={setSelectedPostId}
      />

      <main className="App__main">
        <div className="App__sidebar">
          {posts.length > 0
            ? (
              <PostsList
                selectedPostId={selectedPostId}
                setSelectedPostId={setSelectedPostId}
                userPosts={userPosts}
                isPostSelected={isPostSelected}
                setIsPostSelected={setIsPostSelected}
                setSelectedPost={setSelectedPost}
                selectedPost={selectedPost}
              />
            ) : <Loader />
          }
        </div>

        {selectedPost && isPostSelected && (
          <div className="App__content">
            {selectedPostId === 0
              ? <Loader />
              : (
                <PostDetails
                  selectedPostId={selectedPostId}
                  selectedPost={selectedPost}
                />
              )
            }
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
