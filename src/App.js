import React, { useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import { Button } from 'semantic-ui-react';
import PostList from './components/PostsList/PostsList';

function App() {
  const [isLoading, setLoading] = useState(false);
  const startLoadTodos = () => {
    setLoading(true);
  };

  return (
    <div className="main-wrapper">
      {!isLoading
        ? (
          <Button
            onClick={startLoadTodos}
            primary
            size="huge"
          >
Get Started!
          </Button>
        )
        : <PostList load={isLoading} />}
    </div>
  );
}

export default App;
