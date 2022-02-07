import { useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(0);

  const selectPostId = (postId: number) => {
    setSelectedPostId(postId);
  };

  const clearPostId = () => {
    setSelectedPostId(0);
  };

  const selectUserId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(Number(event.target.value));

    clearPostId();
  };

  return (
    <div className="App">
      <header className="App__header">
        <label htmlFor="user-select">
          Select a user: &nbsp;

          <select
            id="user-select"
            className="App__user-selector"
            value={selectedUserId}
            onChange={(event) => {
              selectUserId(event);
            }}
          >
            <option value={0}>All users</option>
            <option value={1}>Leanne Graham</option>
            <option value={2}>Ervin Howell</option>
            <option value={3}>Clementine Bauch</option>
            <option value={4}>Patricia Lebsack</option>
            <option value={5}>Chelsey Dietrich</option>
            <option value={6}>Mrs. Dennis Schulist</option>
            <option value={7}>Kurtis Weissnat</option>
            <option value={8}>Nicholas Runolfsdottir V</option>
            <option value={9}>Glenna Reichert</option>
            <option value={10}>Leanne Graham</option>
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            selectedUserId={selectedUserId}
            selectedPostId={selectedPostId}
            onOpenPostDetails={selectPostId}
            onClearPostDetails={clearPostId}
          />
        </div>
        <div className="App__content">
          {selectedPostId
            ? <PostDetails selectedPostId={selectedPostId} />
            : (
              <div className="PostDetails">
                <section className="PostDetails__post post-unopened">
                  <p>Please open the post to see details</p>
                </section>
              </div>
            )}
        </div>
      </main>
    </div>
  );
};

export default App;
