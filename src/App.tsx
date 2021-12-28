import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getPosts, getUserPosts } from './api/posts';

const userList = [
  'All users',
  'Leanne Graham I',
  'Ervin Howell',
  'Clementine Bauch',
  'Patricia Lebsack',
  'Chelsey Dietrich',
  'Mrs. Dennis Schulist',
  'Kurtis Weissnat',
  'Nicholas Runolfsdottir V',
  'Glenna Reichert',
  'Leanne Graham',
];

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [user, setUser] = useState(0);
  const [selectedPostId, setPostId] = useState(0);

  const loadPosts = async () => {
    let loadedPosts;

    if (user === 0) {
      loadedPosts = await getPosts();

      setPosts(loadedPosts);
    } else {
      loadedPosts = await getUserPosts(user);
    }

    setPosts(loadedPosts);
  };

  useEffect(() => {
    loadPosts();
  }, [user]);

  const handleUserSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = +event.target.value;

    setUser(userId);
  };

  const handleSetPostId = (postId: number) => {
    let useId = postId;

    if (postId === selectedPostId) {
      useId = 0;
    }

    setPostId(useId);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label htmlFor="users">
          Select a user: &nbsp;

          <select
            id="users"
            value={user}
            className="App__user-selector"
            onChange={handleUserSelect}
          >
            {userList.map((userName, i) => (
              <option key={userName} value={i}>{userName}</option>
            ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            posts={posts}
            selectedPostId={selectedPostId}
            setPostId={handleSetPostId}
          />
        </div>

        <div className="App__content">
          {selectedPostId !== 0 && <PostDetails postId={selectedPostId} />}
        </div>
      </main>
    </div>
  );
};

export default App;
