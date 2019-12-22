import React, { useState } from 'react';
import PostList from './PostList';
import { loadFromServer } from './DataApi';

import './App.css';

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';
const USERS_URL = 'https://jsonplaceholder.typicode.com/users';
const COMMENTS_URL = 'https://jsonplaceholder.typicode.com/comments';

const getAllInfo = (postsData, people, commentsData) => (
  postsData.map(post => (
    {
      ...post,
      user: people.find(person => post.userId === person.id),
      comments: commentsData.filter(comment => comment.postId === post.id),
    }
  ))
);

const App = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isLoaded, setLoaded] = useState(false);
  const [inputValue, setValue] = useState('');
  const filtredPosts = posts.filter(
    ({ title, body }) => (title + body).toLowerCase().includes(inputValue),
  );

  const handleInput = (event) => {
    setValue(event.target.value.toLowerCase().trim());
  };

  const handleClick = async() => {
    setLoading(true);

    const [postsFromServer, users, comments] = await Promise.all([
      loadFromServer(POSTS_URL),
      loadFromServer(USERS_URL),
      loadFromServer(COMMENTS_URL),
    ]);
    const postsWithUsers = getAllInfo(postsFromServer, users, comments);

    setPosts(postsWithUsers);
    setLoading(false);
    setLoaded(true);
  };

  return (
    <div className="App">
      <h1>Dynamic list of posts</h1>
      {isLoaded
        ? (
          <>
            <input
              className="filter"
              type="text"
              value={inputValue}
              onChange={handleInput}
            />
            <PostList info={filtredPosts} />
          </>
        )
        : (<button type="button" onClick={handleClick}>Load data</button>)
      }
      {isLoading && <h3>Loading...</h3>}
    </div>
  );
};

export default App;
