import React, { useState } from 'react';
import './App.css';

import * as api from './api';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loadData = async() => {
    setIsLoading(true);

    const postsFromServer = await api.getPosts();

    setPosts(postsFromServer);
    setIsLoading(false);
    setIsLoaded(true);
  };

  return (
    <>
      <h1>Dynamic list of posts</h1>
      {isLoaded ? (
        <PostsList posts={posts} />
      ) : (
        <button
          type="button"
          onClick={loadData}
        >
          {isLoading ? 'Loading...' : 'Load'}
        </button>
      )}
    </>
  );
};

interface Post {
  title: string;
  body: string;
}

interface PostListProps {
  posts: Post[];
}

const PostsList = ({ posts }: PostListProps) => (
  <ul>
    {posts.map(post => (
      <li>
        <b>{post.title}</b>
        <div>{post.body}</div>
        <hr />
      </li>
    ))}
  </ul>
);

export default App;
