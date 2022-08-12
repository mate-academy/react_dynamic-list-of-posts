import React, { useCallback, useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { Pos } from './types/pos';
import { getUserPosts, getAllPosts } from './api/posts';

const App: React.FC = () => {
  const [loadedPosts, setLoadedPosts] = useState<Pos[]>([]);
  const [userId, setUserId] = useState<string>('0');
  const [selectedPostId, setselectedPostId] = useState<string>('');

  const loadAllPosts = useCallback(
    async () => {
      const loaded = await getAllPosts();

      setLoadedPosts(loaded);
    },
    [],
  );

  async function loadUserPosts(userNumber:string) {
    const loaded = await getUserPosts(userNumber);

    setLoadedPosts(loaded);
  }

  useEffect(() => {
    if (userId !== '0') {
      loadUserPosts(userId);
    } else {
      loadAllPosts();
    }
  }, [userId]);

  useEffect(() => {
    loadAllPosts();
  }, []);

  const changeUserId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(event.target.value);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={userId}
            onChange={changeUserId}
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
          <PostsList
            posts={loadedPosts}
            setPost={setselectedPostId}
            selectedPost={selectedPostId}
          />
        </div>

        <div className="App__content">
          {selectedPostId && <PostDetails postId={selectedPostId} />}
        </div>
      </main>
    </div>
  );
};

export default App;
