import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';

import { getUserPosts } from './api/posts';
import { Loader } from './components/Loader/Loader';
import { Error } from './components/Error/Error';

const App: React.FC = () => {
  const [posts, setPosts] = useState([]);
  const [isPostsLoading, setLoading] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<null | number>(null);
  const [selectedPostId, setSelectedPostId] = useState<null | number>(null);
  const [errorFetch, setErrorFetch] = useState<null | string>(null);

  const fetchPosts = async (userId: number | null = null) => {
    try {
      const postsFromServer = await getUserPosts(userId);

      setLoading(false);
      setPosts(postsFromServer);
    } catch (error) {
      setLoading(false);
      setErrorFetch(`${error}`);
    }
  };

  useEffect(() => {
    setLoading(true);
    setErrorFetch(null);

    if (!selectedUserId) {
      fetchPosts();
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
            value={selectedUserId ? `${selectedUserId}` : '0'}
            onChange={(e) => setSelectedUserId(e.target.value ? +e.target.value : null)}
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
          {errorFetch && (
            ReactDOM.createPortal(
              <Error>
                {errorFetch}
              </Error>,
              document.body,
            )
          )}

          {isPostsLoading
            ? <Loader />
            : (Boolean(errorFetch) || (
              <PostsList
                posts={posts}
                selectedPostId={selectedPostId}
                setSelectedPostId={setSelectedPostId}
              />
            ))}
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
