import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getAllPosts, getUserPosts } from './api/post';

export const App: React.FC = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [postId, selectedPostId] = useState<number | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postFromServer = await getAllPosts();

        setAllPosts(postFromServer);
      } catch {
        throw new Error('Error');
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="App">
      <header className="App__header">
        <label
          htmlFor="user-selector"
        >
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            id="user-selector"
            onChange={async (event) => {
              const postsByUser = await getUserPosts(+event.target.value);

              setAllPosts(postsByUser);
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
            allPosts={allPosts}
            selectedPostId={selectedPostId}
            postId={postId}
          />
        </div>

        <div className="App__content">
          {postId && (
            <PostDetails postId={postId} />
          )}

        </div>
      </main>
    </div>
  );
};
