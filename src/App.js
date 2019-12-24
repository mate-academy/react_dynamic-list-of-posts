import React, { useState } from 'react';
import './App.css';
import PostList from './PostList';

import { getPosts, getUsers, getComments } from './api';

function App() {
  const [posts, setPosts] = useState([]);// пременная и функция
  const [isLoading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');

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

  const handleChangeValue = (event) => {
    setSearchValue(event.target.value.toLowerCase());
  };

  const searchPosts = () => (
    posts.filter(item => item.title.toLowerCase().includes(searchValue)
      || item.body.toLowerCase().includes(searchValue))
  );

  const visiblePosts = searchValue ? searchPosts() : [...posts];

  return (
    <div className="App">
      <h1 className="h1">Dynamic list of posts</h1>
      {posts.length > 0 ? (
        <div>
          <div className="ui action input">
            <input
              type="text"
              onChange={handleChangeValue}
              placeholder="Search..."
            />
          </div>
          <PostList filterPosts={visiblePosts} />
        </div>

      ) : (
        <button className="ui positive button" type="button" onClick={load}>
          {isLoading ? 'Loading...' : 'Load'}
        </button>
      )}
    </div>
  );
}

export default App;
