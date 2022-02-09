import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getAllPosts, getUserPosts } from './api/posts';
import { Loader } from './components/Loader';

const App: React.FC = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(0);
  const [postsLoaded, setPostsLoaded] = useState(false);

  useEffect(() => {
    const loadGoods = async () => {
      const postsFromServer = await getAllPosts();

      setPostsLoaded(true);
      setPosts(postsFromServer);
    };

    loadGoods();
  }, []);

  const handlePostId = (postId: number) => {
    if (selectedPostId === postId) {
      setSelectedPostId(0);
    } else {
      setSelectedPostId(postId);
    }
  };

  async function changeUser(userId: number) {
    const userPosts = await getUserPosts(userId);

    setPosts(userPosts);
  }

  return (
    <div className="App">
      <header className="App__header">
        <label htmlFor="user-selector">
          Select a user: &nbsp;

          <select
            id="user-selector"
            className="App__user-selector"
            onChange={(event) => changeUser(+event.target.value)}
          >
            <option value="0">All users</option>
            <option value="1">Leanne Graham</option>
            <option value="2">Ervin Howell</option>
            <option value="3">Clementine Bauch</option>
            <option value="4">Patricia Lebsack</option>
            <option value="5">Chelsey Dietrich</option>
            <option value="6">Mrs. Dennis Schulist</option>
            <option value="7">Kurtis Weissnat</option>
            <option value="8">Nicholas Runolfsdottir V</option>
            <option value="9">Glenna Reichert</option>
            <option value="10">Leanne Graham</option>
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          {postsLoaded
            ? (
              <PostsList
                posts={posts}
                handlePostId={handlePostId}
                selectedPostId={selectedPostId}
              />
            )
            : <Loader />}

        </div>

        <div className="App__content">
          {selectedPostId !== 0
            && (
              <PostDetails selectedPostId={selectedPostId} />
            )}
        </div>
      </main>
    </div>
  );
};

export default App;
