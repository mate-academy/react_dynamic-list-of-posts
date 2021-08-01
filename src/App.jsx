import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';

const App = () => {
  const [selectedPostId, setSelectedPostId] = useState(0);
  const changeUser = userId => setSelectedPostId(userId);
  const [choosenUser, setChoosenUser] = useState('0');

  useEffect(() => {
  }, [choosenUser]);

  const filterListByUser = (user, list) => {
    if (Number(user) !== 0) {
      return list.filter(item => item.userId === Number(user));
    }

    return list;
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;
          <select
            onChange={({ target }) => setChoosenUser(target.value)}
            className="App__user-selector"
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
            filterListByUser={filterListByUser}
            choosenUser={choosenUser}
            changeUser={changeUser}
          />
        </div>
        <div className="App__content">
          <PostDetails selectedPostId={selectedPostId} />
        </div>
      </main>
    </div>
  );
};

export default App;
