import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';

import * as postsAPI from './api/posts';

export const App: React.FC = () => {
  const [items, setItems] = useState([]);
  const [selectedUser, setSelectedUser] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(0);
  const [selectedPost, setSelectedPost] = useState({} as Post);

  useEffect(() => {
    const loadData = async (userId: number) => {
      if (userId === 0) {
        const postsFromServer = await postsAPI.getAllPosts();

        setItems(postsFromServer);
      } else {
        const postsFromServer = await postsAPI.getUserPosts(userId);

        setItems(postsFromServer);
      }
    };

    loadData(selectedUser);
  }, [selectedUser]);

  useEffect(() => {
    const loadData = async (postId: number) => {
      const postFromServer = await postsAPI.getPostDetails(postId);

      setSelectedPost(postFromServer);
    };

    loadData(selectedPostId);
  }, [selectedPostId]);

  const selectedPostHandler = (event: React.MouseEvent<HTMLButtonElement>, postId: number) => {
    const target = event.currentTarget;
    const buttons = document.querySelectorAll('.PostsList__button');

    if (postId === selectedPostId) {
      setSelectedPostId(0);
      target.innerHTML = 'Open';

      return;
    }

    if (postId !== selectedPostId) {
      buttons.forEach((button) => {
        const valueOfButton = button;

        valueOfButton.innerHTML = 'Open';
      });
    }

    target.innerHTML = 'Close';
    setSelectedPostId(postId);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label htmlFor="userSelect">
          Select a user: &nbsp;

          <select
            id="userSelect"
            className="App__user-selector"
            onChange={(event) => (
              setSelectedUser(+event.target.value)
            )}
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
            selectedPostId={selectedPostId}
            posts={items}
            selectedPostHandler={selectedPostHandler}
          />
        </div>

        <div className="App__content">
          {
            selectedPostId !== 0
            && (
              <PostDetails
                selectedPost={selectedPost}
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
