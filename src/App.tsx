import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getPosts, getUserPosts } from './api/post';

const App: React.FC = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(0);

  const handleSelectedPostId = (postId: number) => {
    setSelectedPostId(postId);
  };

  const requestPosts = async () => {
    try {
      const postsFromServer = await getPosts();

      setPosts(postsFromServer);
    } catch {
      // eslint-disable-next-line no-console
      console.log('Error');
    }
  };

  useEffect(() => {
    requestPosts();
  }, []);

  const handleSelect = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const userPost = await getUserPosts(+event.target.value);

    setPosts(userPost);

    if (+event.target.value === 0) {
      requestPosts();
    }
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={handleSelect}
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
            onSelectPostId={handleSelectedPostId}
            selectedPostId={selectedPostId}
          />
        </div>

        <div className="App__content">
          {selectedPostId !== 0 && (
            <PostDetails selectedPostId={selectedPostId} />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
