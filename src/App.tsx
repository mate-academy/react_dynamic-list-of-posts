import React, { useState } from 'react';
import './App.scss';
import './styles/general.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';

import { loadUserPostDetails } from './api/posts';
import { loadUserComments } from './api/comments';

const App: React.FC = () => {
  const [userComments, setUserComments] = useState<Post[]>([]);
  const [userPostTitle, setUserPostTitle] = useState('');
  const [postId, setPostId] = useState(0);
  const [selectorValue, setSelectorValue] = useState(0);

  const handleOpenPostDetails = async (id: number) => {
    setPostId(id);
    const postDetailsFromServer = await loadUserPostDetails(id);
    const userCommentsFromServer = await loadUserComments(id);

    setUserComments(userCommentsFromServer);
    setUserPostTitle(postDetailsFromServer.title);
  };

  const handleSelector = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectorValue(+event.target.value);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label htmlFor="label">
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={selectorValue}
            onChange={handleSelector}
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
            selectorValue={selectorValue}
            handleOpenPostDetails={handleOpenPostDetails}
            postId={postId}
          />
        </div>

        <div className="App__content">
          {postId !== 0 && (
            <PostDetails
              setUserComments={setUserComments}
              userPostTitle={userPostTitle}
              userComments={userComments}
              selectorValue={selectorValue}
              postId={postId}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
