import React, { useState } from 'react';
import './App.css';
import PostList from './PostList';

import { getPosts, getUsers, getComments } from './api';

function App() {
  const [posts, setPosts] = useState([]);// пременная и функция
  const [isLoading, setLoading] = useState(false);

  const load = async() => {
    setLoading(true);
    const [postsFromServer,
      usersFromServer,
      commentsFromServer] = await Promise.all([
      getPosts(),
      getUsers(),
      getComments(),
    ]);

    setPosts(postsFromServer.map(post => ({
      ...post,
      user: usersFromServer.find(person => person.id === post.userId),
      comment: commentsFromServer
        .filter(commentElem => commentElem.postId === post.id),
    })));
  };

  return (

    <div className="App">
      <h1 className="h1">Dynamic list of posts</h1>
      {posts.length > 0 ? (
        <PostList posts={posts} />
      ) : (
        <button className="ui positive button" type="button" onClick={load}>
          {isLoading ? 'Loading...' : 'Load'}
        </button>
      )}
    </div>
  );
}

export default App;
