import React, { useState } from 'react';
import './App.css';

import { getPosts } from './api/posts';
import { getUsers } from './api/users';
import { getComments } from './api/comments';

import PostList from './PostList';

function App() {
  const [postsWithUsers, setPostsWithUsers] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [searchItem, setSearchItem] = useState('');

  const loadData = async() => {
    setLoading(!isLoading);

    const [
      postsFromServer,
      usersFromServer,
      commentsFromServer,
    ] = await Promise.all([
      getPosts(),
      getUsers(),
      getComments(),
    ]);

    setPostsWithUsers(postsFromServer.map(
      post => ({
        ...post,
        user: usersFromServer.find(user => user.id === post.userId),
        comments: commentsFromServer
          .filter(comment => comment.postId === post.id),
      })
    ));
  };

  const handleChangeItem = (event) => {
    setSearchItem(event.target.value.toLowerCase());
  };

  const filteredItems = () => ([...postsWithUsers]
    .filter(post => post.title.toLowerCase().includes(searchItem)
      || post.body.toLowerCase().includes(searchItem)));

  const postsToBeShown = searchItem ? filteredItems() : [...postsWithUsers];

  return (
    <div className="App">
      <h1 className="title">Dynamic List of Posts</h1>
      {postsWithUsers.length > 0 ? (
        <>
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={handleChangeItem}
          />
          <PostList posts={postsToBeShown} />
        </>
      ) : (
        <button
          className="button"
          type="button"
          onClick={loadData}
        >
          {isLoading ? 'Loading...' : 'Load'}
        </button>
      )}
    </div>
  );
}

export default App;
