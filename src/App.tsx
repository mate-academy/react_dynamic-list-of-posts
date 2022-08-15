import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { Post } from './types/Post';
import { getUserPosts, getAllPosts } from './api/posts';
import { Loader } from './components/Loader';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedUser, setSelectedUser] = useState('0');
  const [selectedPostId, setSelectedPostId] = useState(NaN);
  const [isLoading, setIsLoading] = useState(true);

  const hadleResponse = (res: Post[]) => {
    setPosts(res);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    if (selectedUser === '0') {
      getAllPosts().then(hadleResponse);
    } else {
      getUserPosts(selectedUser).then(hadleResponse);
    }
  }, [selectedUser]);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={selectedUser}
            onChange={e => setSelectedUser(e.target.value)}
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
          {isLoading ? (
            <Loader />
          ) : (
            <PostsList
              posts={posts}
              selectedPostId={selectedPostId}
              setSelectedPostId={setSelectedPostId}
            />
          )}
        </div>

        {!Number.isNaN(selectedPostId) && (
          <div className="App__content">
            <PostDetails selectedPostId={selectedPostId} />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
