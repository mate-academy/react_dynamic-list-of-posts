import React, { useState } from 'react';
import './App.css';
import { getPosts, getUsers, getComments } from './api';
import { debounce } from './debounce';
import PostList from './PostList';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [filter, setFilter] = useState('');

  const loadPosts = async() => {
    setLoading(true);

    const [postsFromServer,
      usersFromServer,
      commentsFromServer] = await Promise.all(
      [getPosts(), getUsers(), getComments()]
    );

    const preparedPosts = postsFromServer.map((post) => {
      const user = usersFromServer.find(item => item.id === post.userId);
      const comments = commentsFromServer
        .filter(comment => comment.postId === post.id);

      return {
        ...post, user, comments,
      };
    });

    setPosts(preparedPosts);
    setLoaded(true);
    setLoading(false);
  };

  const filterPosts = debounce((input) => {
    setFilter(input.toLowerCase().trim());
  }, 1000);

  const filteredPosts = posts
    .filter(post => post.title.toLowerCase().includes(filter)
      || (post.body.toLowerCase().includes(filter)));

  return (
    <div className="App">
      <h1>Dynamic list of posts</h1>
      {!loaded
        ? (
          <button
            className="button--load"
            type="button"
            onClick={loadPosts}
          >
            {!loading
              ? 'Load list of posts'
              : 'loading... Please wait...'}
          </button>
        )
        : (
          <PostList posts={filteredPosts} filterPosts={filterPosts} />
        )}

    </div>
  );
};

export default App;
