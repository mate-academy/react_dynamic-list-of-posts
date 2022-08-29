import React from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelect } from './components/UserSelect';
// import { useAppSelector } from './hooks/useAppSelector';

const App: React.FC = () => {
  // const { posts } = useAppSelector(state => state.postSlice);

  return (
    <div className="App">
      <UserSelect />

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList />
        </div>

        <div className="App__content">
          <PostDetails />
        </div>
      </main>
    </div>
  );
}

export default App;
