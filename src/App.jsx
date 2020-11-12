import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUserPosts } from './api/posts';
import { Loader } from './components/Loader/Loader';
import { UserSelect } from './components/UserSelect';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState({});
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [activePostId, setActivePostId] = useState(0);

  useEffect(() => {
    async function fetchData() {
      setPosts(await getUserPosts(0));
      setLoading(false);
    }

    fetchData();
  }, []);

  useEffect(() => {
    const updatedPost = posts.find(post => post.id === activePostId);
    setSelectedPost(updatedPost);
  }, [activePostId]);

  const handleSelectChange = (userId) => {
    setSelectedUserId(userId);
  };

  return (
    <div className="App">
      <header className="App__header">
        <UserSelect onUserSelect={handleSelectChange} />
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          {loading
            ? <Loader />
            : (
              <PostsList
                posts={posts}
                selectedUserId={selectedUserId}
                onActivePostChange={setActivePostId}
              />
            )
          }
        </div>

        <div className="App__content">
          <PostDetails {...selectedPost} />
        </div>
      </main>
    </div>
  );
};

export default App;
