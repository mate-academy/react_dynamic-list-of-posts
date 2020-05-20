import React, { useState } from 'react';
import './App.css';
import { getAllPosts } from './helpers/api';
import { PostWithUser } from './helpers/typeDefs';
import LoadingButtons from './components/LoadingButtons';
import { PostList } from './components/PostList';

const App = () => {
  const [posts, setPosts] = useState<PostWithUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLoadClick = async () => {
    setIsLoading(true);
    try {
      const preparedPosts = await getAllPosts();

      setPosts(preparedPosts);
    } catch (error) {
      setErrorMessage('Errors happens, try to reload');
    }

    setIsLoading(false);
  };


  return (
    <>
      <h1>Dynamic list of posts</h1>
      <LoadingButtons
        posts={posts}
        isLoading={isLoading}
        handleLoadClick={handleLoadClick}
        errorMessage={errorMessage}
      />
      {posts.length !== 0
        ? <PostList posts={posts} />
        : ''}
    </>
  );
};

export default App;
