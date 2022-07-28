import React, {
  useState,
  useCallback,
  useEffect,
} from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUserPosts } from './api/posts';

const App: React.FC = () => {
  const [selectedPostId, setSelectedPostId] = useState(0);
  const [posts, setPosts] = useState<Post[] | null>([]);
  const [
    selectedUserId, setSelectedUserId] = useState(0);

  const loadUserPosts = useCallback(
    async (id: number) => {
      setPosts(await getUserPosts(id));
    }, [selectedUserId],
  );

  const handlePostSelect = async (postId: number) => {
    setSelectedPostId(postId);
  };

  useEffect(
    () => {
      loadUserPosts(selectedUserId);
    }, [selectedUserId],
  );

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={selectedUserId}
            onChange={(event) => {
              setSelectedUserId(+event.target.value);
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
          <PostsList
            posts={posts}
            selectedPostId={selectedPostId}
            onPostSelect={handlePostSelect}
          />
        </div>

        <div className="App__content">
          {
            selectedPostId > 0 && (
              <PostDetails
                selectedPostId={selectedPostId}
              />
            )
          }
        </div>
      </main>
    </div>
  );
};

export default App;
