import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';

import { getUserPosts } from './api/posts';
import { Loader } from './components/Loader/Loader';

const App: React.FC = () => {
  const [posts, setPosts] = useState([]);
  const [isPostsLoading, setLoading] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState('0');
  const [selectedPostId, setSelectedPostId] = useState<null | number>(null);

  const fetchPosts = async (userId: string) => {
    try {
      const postsFromServer = await getUserPosts(userId);

      setLoading(false);
      setPosts(postsFromServer);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  useEffect(() => {
    setLoading(true);

    if (selectedUserId === '0') {
      fetchPosts('');
    } else {
      fetchPosts(selectedUserId);
    }
  }, [selectedUserId]);

  return (
    <div className="App">
      <header className="App__header">
        <label htmlFor="select">
          Select a user: &nbsp;

          <select
            id="select"
            className="App__user-selector"
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
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
          {isPostsLoading
            ? <Loader />
            : (
              <PostsList
                posts={posts}
                selectedPostId={selectedPostId}
                setSelectedPostId={setSelectedPostId}
              />
            )}
        </div>

        {selectedPostId && (
          <div className="App__content">
            <PostDetails selectedPostId={selectedPostId} />
          </div>
        )}

      </main>
    </div>
  );
};

export default App;
