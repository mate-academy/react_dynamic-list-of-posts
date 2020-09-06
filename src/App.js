import React, { useState } from 'react';
import './App.scss';

import { PostList } from './components/PostList/PostList';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState([]);

  const fetchData = async() => {
    const BASE_URL
      = 'https://mate-academy.github.io/react_dynamic-list-of-posts/api/';

    Promise.all([
      (await fetch(`${BASE_URL}posts.json`)).json(),
      (await fetch(`${BASE_URL}users.json`)).json(),
      (await fetch(`${BASE_URL}comments.json`)).json(),
    ]).then((response) => {
      const postsFromServer = response[0];
      const usersFromServer = response[1];
      const commentsFromServer = response[2];

      const preparedPosts = postsFromServer.map(post => (
        {
          post,
          user: usersFromServer
            .find(user => user.id === post.userId),
          comments: commentsFromServer
            .filter(comment => comment.postId === post.id),
        }
      ));

      setPosts(preparedPosts);
      setVisiblePosts(preparedPosts);
    });
  };

  const debounce = () => {
    const filter = (e) => {
      const updatedPosts = posts.filter(current => (
        current.post.title.toLowerCase()
          .includes(e.target.value.toLowerCase())
        || current.post.body.toLowerCase()
          .includes(e.target.value.toLowerCase())
      ));

      setVisiblePosts(updatedPosts);
    };

    let timer;

    return (event) => {
      const savedEvent = { ...event };

      clearTimeout(timer);
      timer = setTimeout(() => filter(savedEvent), 1000);
    };
  };

  return (
    <div className="App">
      <h1>Dynamic list of posts</h1>
      {!posts.length && (
        <button
          type="button"
          className="load-button"
          onClick={(e) => {
            const input = e.target;

            input.innerHTML = 'Loading...';

            fetchData();
          }}
        >
          Load
        </button>
      )}

      {posts.length > 0 && (
        <input
          type="search"
          className="filter"
          placeholder="Type search word"
          onChange={debounce()}
        />
      )}

      <PostList posts={visiblePosts} />
    </div>
  );
};

export default App;
