import React, { useState, useEffect } from 'react';

import './App.scss';
import './styles/general.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { Loader } from './components/Loader';

import { getUserPosts } from './api/posts';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const [selectedPostId, setSelectedPostId] = useState<number>(0);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const loadPosts = async () => {
      const postsFromServer = await getUserPosts(selectedUserId);

      setPosts(postsFromServer);
    };

    try {
      loadPosts();
    } catch (error) {
      setIsError(true);
    }
  }, [selectedUserId]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(Number(event.target.value));
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const newPostId = Number(event.currentTarget.value);

    setSelectedPostId(
      newPostId === selectedPostId
        ? 0
        : newPostId,
    );
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={handleSelectChange}
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
          {isError
            ? (<h1>An error occured</h1>)
            : (
              <>
                {posts === null
                  ? (
                    <Loader />
                  )
                  : (
                    <PostsList
                      posts={posts}
                      selectedPostId={selectedPostId}
                      onButtonClick={handleButtonClick}
                    />
                  )}
              </>
            )}
        </div>

        <div className="App__content">
          {selectedPostId > 0 && (
            <PostDetails selectedPostId={selectedPostId} />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
