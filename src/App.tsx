import React, { useState } from 'react';
import './App.css';
import { preparedPosts } from './api';
import { PostList } from './PostList';

const App: React.FC = () => {
  const [posts, setPosts] = useState<PreparedPost[]>([]);
  const [isDownloaded, setDownloaded] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleDownloadData = () => {
    setLoading(true);
    preparedPosts().then((data) => {
      setPosts(data);
      setLoading(false);
      setDownloaded(true);
    });
  };

  return (
    <div className="post">
      {!isDownloaded && (
        <button
          type="button"
          className="button"
          onClick={handleDownloadData}
        >
          {isLoading ? 'loading...' : 'Load'}
        </button>
      )}
      {isDownloaded && (
        <PostList posts={posts} />
      )}
    </div>
  );
};

export default App;
