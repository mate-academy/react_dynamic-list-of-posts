import React from 'react';
import './App.scss';
import './styles/general.scss';
import { useSelector } from 'react-redux';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getPostDetailsId } from './store/selectors';
import { Header } from './components/Header';

const App: React.FC = () => {
  const postId = useSelector(getPostDetailsId);

  return (
    <div className="App">
      <Header />
      <main className="App__main">
        <div className="App__sidebar">
          <PostsList />
        </div>

        {postId !== 0 && (
          <div className="App__content">
            <PostDetails />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
