import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { Loader } from './components/Loader/Loader';
import { PostDetails } from './components/PostDetails';

const App = () => {
  const [selectedUser, setUser] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [loading, setloading] = useState(false);
  const [loadingPosts, setloadingPosts] = useState(false);

  useEffect(() => {
    setTimeout(() => setloading(false), 1000);
    setTimeout(() => setloadingPosts(false), 1000);
  }, [loading, loadingPosts]);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={selectedUser}
            onChange={(event) => {
              setUser(+event.target.value);
              setloadingPosts(true);
            }}
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
          {loadingPosts
            ? <Loader />
            : (
              <PostsList
                loading={loading}
                setLoading={setloading}
                userId={selectedUser}
                selectedPostId={selectedPostId}
                setSelectedPostId={setSelectedPostId}
              />
            )
          }

        </div>
        <div className="App__content">
          {loading
            ? <Loader />
            : <PostDetails selectedPostId={selectedPostId} />
          }
        </div>
      </main>
    </div>
  );
};

export default App;
