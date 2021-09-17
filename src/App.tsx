import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUsers } from './api/users';

const App: React.FC = () => {
  const [users, showUsers] = useState<User[]>([]);
  const [selectedUserId, getUserId] = useState(0);
  const [isVisibleDetails, setDetailsVisibility] = useState(false);
  const [detailedPostId, setDetailedPostId] = useState(0);

  const handleVisibleDetail = (id: number) => {
    setDetailsVisibility(prevState => !prevState);
    setDetailedPostId(id);
  };

  const handleSelectOptions = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    getUserId(+event.target.value);
  };
  /* eslint-disable-next-line */
console.log(selectedUserId);

  useEffect(() => {
    getUsers().then(data => showUsers(data));
  }, []);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={handleSelectOptions}
          >
            {users.map(user => (
              <option key={user && user.id} value={user && user.id}>{user && user.name}</option>
            ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            selectedUserId={selectedUserId}
            // isVisibleDetails={isVisibleDetails}
            handleVisibleDetail={handleVisibleDetail}
          />
        </div>

        {isVisibleDetails && (
          <div className="App__content">
            <PostDetails detailedPostId={detailedPostId} />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
