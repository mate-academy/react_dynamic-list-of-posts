import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getPostDetails } from './api/posts';

const App: React.FC = () => {
  const [userSelect, setUserSelect] = useState('0');
  const [selectedPostId, setSelectedPostId] = useState(0);
  const [postDetails, setPostDetails] = useState<Post | null>(null);

  useEffect(() => {
    if (selectedPostId) {
      getPostDetails(selectedPostId)
        .then(result => setPostDetails(result))
        .catch(error => {
          // eslint-disable-next-line no-console
          console.log(error);
        });
    }
  }, [selectedPostId]);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={(event) => {
              setUserSelect(event.target.value);
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
            userSelect={+userSelect}
            selectedPostId={selectedPostId}
            setSelectedPostId={setSelectedPostId}
            setPostDetails={setPostDetails}
          />
        </div>
        {postDetails && (
          <div className="App__content">
            <PostDetails selectedPostId={selectedPostId} />
          </div>
        ) }
      </main>
    </div>
  );
};

export default App;
