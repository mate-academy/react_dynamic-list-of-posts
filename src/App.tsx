import React from 'react';
import './App.css';
import { Posts } from './components/Posts';

const App: React.FC = () => (
  <div className="container">
    <h1>Dynamic list of posts</h1>
    <Posts />
  </div>
);

export default App;
