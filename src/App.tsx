import React, { useState } from 'react';
import './App.css';
import { Button } from './components/Button/Button';
import { PreparedPost } from './interfaces';
import { makePosts } from './utils/preparePosts';
import { PostList } from './components/PostList/PostList';

// function getFilteredPosts(
//   posts: PreparedPost[],
//   filter: string,
// ): PreparedPost[] {
//   return posts.filter();
// }

const App = () => {
  const [posts, setPosts] = useState<PreparedPost[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [isLoaded, setLoaded] = useState(false);

  // useMemo(() => {
  //   return getFilteredPosts(posts, filter);
  // }, [posts, filter]);

  const loadData = () => {
    setLoading(true);
    makePosts().then(data => {
      setPosts(data);
      setLoading(false);
      setLoaded(true);
    });
  };
  /* onFilterPosts */

  return (
    <>
      <h1>Dynamic list of posts</h1>
      {
        isLoaded
          ? <PostList posts={posts} />
          : (
            <Button
              onClick={loadData}
              content={isLoading ? 'Loading...' : 'Load'}
            />
          )
      }
    </>
  );
};

export default App;
