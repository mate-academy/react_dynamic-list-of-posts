import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUsers } from './api/BA';

type User = {
  id: number,
  name: string,
  username: string,
};

const App: React.FC = () => {
  const [visibleUsers, setVisibleUsers] = useState<User[]>([]);
  const [currentSelect, setCurrentSelect] = useState<number>(0);
  const [selectedPostId, setSelectedPostId] = useState<number>(0);

  useEffect(() => {
    getUsers()
      .then(res => setVisibleUsers(res.slice(0, 10)));
  }, []);

  const openPost = (idPost:number) => {
    setSelectedPostId(idPost);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label htmlFor="selectUsers">
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            id="selectUsers"
            onChange={(e) => setCurrentSelect(+e.target.value)}
          >
            <option value={0}>All users</option>
            {visibleUsers.map(el => (
              <option
                value={el.id}
                key={el.id}
              >
                {el.name}
              </option>
            ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            currentId={currentSelect}
            openPost={openPost}
          />
        </div>

        <div className="App__content">
          {(selectedPostId !== 0) && <PostDetails selectedPostId={selectedPostId} />}
        </div>
      </main>
    </div>
  );
};

export default App;
