import React, { useState, ChangeEvent } from 'react';
import './App.css';

import { getPost, getUsers, getComments } from './api';
import { Posts, ensure } from './helper';
import PostList from './PostList';

const App = () => {
  const [filteredPost, setfilteredPost] = useState<Posts[]>([]);
  const [posts, setPost] = useState<Posts[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [isLoaded, setLoaded] = useState(false);
  const [error, setError] = useState('');

  const isLoad = async () => {
    setLoading(true);

    try {
      const userFromServer = await getUsers();
      const postFromServer = await getPost();
      const commentsFromServer = await getComments();

      const preperedListOfPosts = postFromServer.map(item => ({
        ...item,
        user: ensure(userFromServer.find(itemId => (itemId.id === item.userId))),
        comments: commentsFromServer.filter(postId => (postId.postId === item.userId)),
      }));

      setPost(preperedListOfPosts);
      setLoading(false);
      setLoaded(true);
    } catch (e) {
      setError('Cant load List, try later');
      setLoaded(false);
      setLoading(false);
    }
  };

  const handlfilter = (event: ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;

    const filtered = [...posts]
      .filter(item => item.title.includes(text) || item.body.includes(text));

    setfilteredPost(filtered);
  };

  return (
    <>
      {isLoaded
        && (
          <input type="text" onChange={handlfilter} />
        )}
      {!isLoaded
        && (
          <button type="button" onClick={isLoad}>
            {isLoading ? 'Loading...' : 'Load'}
          </button>
        )}


      {filteredPost.length > 0
        ? <PostList posts={filteredPost} />
        : <PostList posts={posts} />}

      {error && <p>{error}</p>}
    </>
  );
};

export default App;
