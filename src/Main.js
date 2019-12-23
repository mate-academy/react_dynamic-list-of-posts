import React, { useState } from 'react';

import PostList from './PostList';
import UnitedBlock from './UnitedBlock';
import GetDataFromServer from './api/GetDataFromServer';

const Main = () => {
  const [posts, setPosts] = useState({
    post: [],
    user: [],
    comments: [],
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [textInput, setTextInput] = useState('');
  let postsUsersComments
    = UnitedBlock(posts.post, posts.user, posts.comments);

  const loadPosts = async() => {
    setIsLoading(true);
    const [allUsers, allComments, allPosts]
    = await Promise.all([
      GetDataFromServer('https://jsonplaceholder.typicode.com/users'),
      GetDataFromServer('https://jsonplaceholder.typicode.com/comments'),
      GetDataFromServer('https://jsonplaceholder.typicode.com/posts'),
    ]);

    setIsLoading(true);
    setPosts({
      post: allPosts,
      user: allUsers,
      comments: allComments,
    });
    setIsLoading(false);
    setIsLoaded(true);
  };

  function debounce(f, delay) {
    let timer;

    return () => {
      clearTimeout(timer);
      timer = setTimeout(() => f(), delay);
    };
  }

  function inputText() {
    setTextInput(document.querySelector('#text').value);
  }

  if (loading) {
    return (
      <p className="App">
          ...LOADING
      </p>
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

  try {
    postsUsersComments = postsUsersComments.filter((post) => {
      const postContent = post.title + post.body;

      return postContent.includes(textInput);
    });
  } catch {
    postsUsersComments = [];
  }

  return (
    <section className="App">
      <input
        id="text"
        type="text"
        placeholder="Search..."
        onChange={debounce(inputText, 1000)}
      />
      <p>
        {postsUsersComments.length}
        {' '}
        posts found
      </p>
      <PostList posts={postsUsersComments} />
    </section>
  );
};

export default Main;
