import React, { useState } from 'react';
import './App.css';

import { getPost, getUsers, getComments } from './api';
import { Posts } from './helper';
import PostList from './PostList';

const App = () => {
  const [postBefore, setPostBefore] = useState<Posts[]>([]);
  const [posts, setPost] = useState<Posts[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [isLoaded, setLoaded] = useState(false);

  const isLoad = async () => {
    setLoading(true);
    const userFromServer = await getUsers();
    const postFromServer = await getPost();
    const commentsFromServer = await getComments();

    const preperedListOfPosts = postFromServer.map(item => ({
      ...item,
      user: userFromServer.filter(itemId => (itemId.id === item.userId)),
      comments: commentsFromServer.filter(postId => (postId.postId === item.userId)),
    }));

    setPost(preperedListOfPosts);
    setPostBefore(preperedListOfPosts);
    setLoading(false);
    setLoaded(true);
  };

  const handlReset = () => {
    setPost(postBefore);
  };

  const handlTitleFilter = () => {
    const filteredPost = [...posts].sort((a, b) => a.title.localeCompare(b.title));

    setPost(filteredPost);
  };

  const handlBodyFilter = () => {
    const filteredPost = [...posts].sort((a, b) => a.body.localeCompare(b.body));

    setPost(filteredPost);
  };

  return (
    <>
      <button type="button" onClick={handlTitleFilter}>Filter By Title</button>
      <button type="button" onClick={handlBodyFilter}>Filter By body</button>
      <button type="button" onClick={handlReset}>Reset</button>
      {!isLoaded ? (
        <button type="button" onClick={isLoad}>
          {isLoading ? 'Loading...' : 'Load'}
        </button>
      ) : <PostList posts={posts} />}
    </>
  );
};

export default App;
