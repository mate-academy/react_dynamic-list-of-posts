import { Fragment, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';

const App: React.FC = () => {
  const [userSelect, setUserSelect] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const users = [
    { id: 0, title: 'All users' },
    { id: 1, title: 'Leanne Graham' },
    { id: 2, title: 'Ervin Howell' },
    { id: 3, title: 'Clementine Bauch' },
    { id: 4, title: 'Patricia Lebsack' },
    { id: 5, title: 'Chelsey Dietrich' },
    { id: 6, title: 'Mrs. Dennis Schulist' },
    { id: 7, title: 'Kurtis Weissnat' },
    { id: 8, title: 'Nicholas Runolfsdottir V' },
    { id: 9, title: 'Glenna Reichert' },
  ];

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={(e) => {
              setSelectedPostId(null);
              setUserSelect(Number(e.target.value));
            }}
          >
            {
              users.map(el => (
                <Fragment key={el.id}>
                  <option value={el.id}>{el.title}</option>
                </Fragment>
              ))
            }
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            userSelect={userSelect}
            setSelectedPostId={setSelectedPostId}
            selectedPostId={selectedPostId}
          />
        </div>

        {
          selectedPostId && (
            <div className="App__content">
              <PostDetails
                selectedPostId={selectedPostId}
              />
            </div>
          )
        }
      </main>
    </div>
  );
};

export default App;
