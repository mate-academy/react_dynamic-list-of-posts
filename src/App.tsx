import { FC, useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { Post } from './types/Post';
import { getUserPosts } from './api/posts';
import { Loader } from './components/Loader';

const App: FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [userId, setUserId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [selectedPostId, setSelectedPostId] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    getUserPosts(userId)
      .then(res => {
        if ('Error' in res) {
          return Promise.reject(res.Error);
        }

        setPosts(res);

        return Promise.resolve();
      })
      .catch(setErrorMsg)
      .finally(() => setIsLoading(false));
  }, [userId]);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={userId}
            onChange={(event) => setUserId(Number(event.target.value))}
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

      {!isLoading && !errorMsg && (
        <main className="App__main">
          <div className="App__sidebar">
            <PostsList
              posts={posts}
              selectedPostId={selectedPostId}
              onSelectedPostId={setSelectedPostId}
            />
          </div>

          <div className="App__content">
            <PostDetails />
          </div>
        </main>
      )}
      {isLoading && <Loader />}
      {errorMsg && <div>{`Something went wrong... ${errorMsg}`}</div>}
    </div>
  );
};

export default App;
