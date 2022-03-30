/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUserPost } from './api/posts';

import { UserPost } from './react-app-env';

const App: React.FC = () => {
  const [selectedUserId, setSelectedtUserId] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(-1);
  const [postsFromServer, setPostsFromServer] = useState<UserPost[]>([]);

  useEffect(() => {
    getUserPost(selectedUserId).then(response => {
      setPostsFromServer(response);
    });
  }, [selectedUserId]);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select className="App__user-selector" onChange={(event) => setSelectedtUserId(+event.target.value)}>
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
            postsFromServer={postsFromServer}
            selectedPostId={selectedPostId}
            setSelectedPostId={(postId: number) => setSelectedPostId(postId)}
          />
        </div>

        <div className="App__content">
          {selectedPostId !== -1 ? (
            <PostDetails
              selectedPostId={selectedPostId}
            />
          ) : (<h4>Choose a post</h4>)}
        </div>
      </main>
    </div>
  );
};

export default App;
