import React, { ChangeEvent, useCallback, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';

const App: React.FC = () => {
  const [selectedUserId, setSelectedUser] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const handleSelect = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setSelectedUser(+value);
  }, []);

  const onSelectPostId = useCallback((value: number) => {
    setSelectedPostId(value === selectedPostId ? null : value);
  }, [selectedPostId]);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={String(selectedUserId)}
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
            selectedUserId={selectedUserId}
            onSelectPostId={onSelectPostId}
            selectedPostId={selectedPostId}
          />
        </div>

        <div className="App__content">
          {selectedPostId && (
            <PostDetails
              selectedPostId={selectedPostId}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;

// Пункт номер 9, створити метод getPost
