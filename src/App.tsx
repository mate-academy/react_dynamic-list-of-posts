import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUserPosts } from './api/post';

const App: React.FC = () => {
  const [posts, addPosts] = useState<Post[] | null>(null);
  const [selectedPostId, setSelectedPostId] = useState<number>();

  useEffect(() => {
    const setPosts = async () => {
      const response = await getUserPosts();

      addPosts(response);
    };

    setPosts();
  }, []);

  const userPosts = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.currentTarget;
    const response = await getUserPosts(value);

    addPosts(response);
  };

  const userPostDetail = async (id: number) => {
    setSelectedPostId(id);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={(event) => userPosts(event)}
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
          {posts && (
            <PostsList
              userPosts={posts}
              userPostDetail={userPostDetail}
              selectedPostId={selectedPostId}
            />
          )}
        </div>

        <div className="App__content">
          {selectedPostId && (
            <PostDetails postId={selectedPostId} />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
