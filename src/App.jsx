import React, { useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';

const App = () => {
  const [selectedValue, setSelectedValue] = useState('0');
  const [selectedPostId, setSelectedPostId] = useState('0');
  const [detailsVisible, setDetailsVisible] = useState(false);

  const handlePostSelection = (postId, details) => {
    setSelectedPostId(postId);
    setDetailsVisible(details);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={selectedValue}
            onChange={event => setSelectedValue(event.target.value)}
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
            userId={selectedValue}
            handlePostSelection={handlePostSelection}
          />
        </div>

        <div className="App__content">
          {selectedPostId !== '0' && !detailsVisible
            ? (
              <PostDetails
                selectedPostId={selectedPostId}
              />
            )
            : 'Nothing selected'
          }
        </div>
      </main>
    </div>
  );
};

export default App;
