import React, { useState } from 'react';

import PostList from './PostList';
import UnitedBlock from './UnitedBlock';
import GetDataFromServer from './api/GetDataFromServer';

const Main = () => {
  const [postList, setPostList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [commentsList, setCommentsList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [textInput, setTextInput] = useState('');
  let postsUsersComments
    = UnitedBlock(postList, userList, commentsList);

  const load = async() => {
    setIsLoading(true);
    const [allUsers, allComments, allPosts]
    = await Promise.all([
      GetDataFromServer('https://jsonplaceholder.typicode.com/users'),
      GetDataFromServer('https://jsonplaceholder.typicode.com/comments'),
      GetDataFromServer('https://jsonplaceholder.typicode.com/posts'),
    ]);

    setIsLoading(true);
    setUserList(allUsers);
    setCommentsList(allComments);
    setPostList(allPosts);
    setIsLoading(false);
    setIsLoaded(true);
  };

  const inputText = (e) => {
    setTextInput(e.target.value);
  };

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
        <button type="button" onClick={load}>
          Load
        </button>
      </section>
    );
  }

  try {
    postsUsersComments = postsUsersComments.filter(post => (
      new RegExp(`(${textInput})`, 'g').test(post.title)
      || new RegExp(`(${textInput})`, 'g').test(post.body)
    ));
  } catch {
    postsUsersComments = [];
  }

  return (
    <section className="App">
      <input
        type="text"
        placeholder="Search..."
        onChange={inputText}
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
