import React, { useState } from 'react';

import PostList from './PostList';
import getDataFromServer from './api/GetDataFromServer';

const Main = () => {
  const [posts, setPosts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [textInput, setTextInput] = useState('');

  const loadPosts = async() => {
    setIsLoading(true);
    const [allUsers, allComments, allPosts]
    = await Promise.all([
      getDataFromServer('https://jsonplaceholder.typicode.com/users'),
      getDataFromServer('https://jsonplaceholder.typicode.com/comments'),
      getDataFromServer('https://jsonplaceholder.typicode.com/posts'),
    ]);

    setIsLoading(true);
    setPosts(
      allPosts.map(post => ({
        ...post,
        user: allUsers.find(user => user.id === post.userId),
        comments: allComments.filter(commentId => commentId.postId === post.id),
      }))
    );
    setIsLoading(false);
    setIsLoaded(true);
  };

  function debounce(f, delay) {
    let timer;

    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        loadPosts();

        return f(...args);
      }, delay);
    };
  }

  const inputText = debounce(setTextInput, 1000);

  if (loading) {
    return (
      <p className="App">...LOADING</p>
    );
  }

  if (!isLoaded) {
    return (
      <section className="App">
        <button type="button" onClick={loadPosts}>
          Load
        </button>
      </section>
    );
  }

  const filteredPost = posts.filter((post) => {
    const postContent = post.title + post.body;

    return postContent.includes(textInput);
  });

  if (JSON.stringify(filteredPost) !== JSON.stringify(posts)) {
    try {
      setPosts(filteredPost);
    } catch {
      setPosts([]);
    }
  }

  return (
    <section className="App">
      <input
        id="text"
        type="text"
        placeholder="Search..."
        onChange={event => inputText(event.target.value)}
      />
      <p>
        {posts.length}
        {' '}
        posts found
      </p>
      <PostList posts={posts} />
    </section>
  );
};

export default Main;
