import React, { useState } from 'react';
import './App.scss';
import { getPreparedPosts } from './helpers/api';
import { PostList } from './components/PostList';
import { LoadButton } from './components/LoadButton';

const App = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  async function loadPosts() {
    const preparedPosts = await getPreparedPosts();

    setPosts(preparedPosts);
    setIsLoaded(true);
  }

  return (
    <div className="container">
      <h1 className="row center-align">Dynamic list of Posts</h1>
      {!isLoaded ? (
        <div className="row center-align">
          <LoadButton loadPosts={loadPosts} />
        </div>
      ) : (
        <div className="row">
          <div className="col s12">
            <PostList posts={posts} />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
