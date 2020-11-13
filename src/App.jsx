import React from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { Select } from './components/Select';

const App = () => (
  <div className="App">
    <Select />

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

export default App;
