/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import React, { useState } from 'react';
import './App.css';
import PostList from './PostList';
import { getPosts, getUsers, getComments } from './api';

function App() {
  const [posts, setPosts] = useState([]);
  const [visibleContent, changeContent] = useState(false);
  const [loadingButton, setLoadingButton] = useState('Load list of posts');
  const [valueInput, setValue] = useState('');

  const loadPosts = async() => {
    setLoadingButton('Loading...');
    const [postsList, usersList, commentsList] = await
    Promise.all([getPosts(), getUsers(), getComments()]);

    const allList = postsList.map(post => ({
      ...post,
      user: usersList.find(user => user.id === post.userId),
      comments: commentsList.filter(str => str.postId === post.id),
    }));

    setPosts(allList);
    changeContent(true);
  };

  const setInputUsers = (event) => {
    setValue(event.target.value);
  };

  const filterPost = () => {
    if (valueInput.length === 0) {
      return posts;
    }

    return posts.filter((post) => {
      if (post.body.includes(valueInput)) {
        return post;
      }

      if (post.title.includes(valueInput)) {
        return post;
      }
    });
  };

  return (
    <div className="main">
      <h1 className="title">Dynamic list of posts</h1>
      {!visibleContent ? (
        <button
          type="button"
          onClick={loadPosts}
          className="loadButton"
        >
          {loadingButton}
        </button>
      ) : (
        <>
          <div className="input">
            <h2 className="input__title">Search post: </h2>
            <input
              type="text"
              className="input__searсh"
              value={valueInput}
              onChange={setInputUsers}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  return filterPost;
                }
              }}
            />
          </div>
          <PostList
            filterPost={filterPost()}
          />
        </>
      )
      }
    </div>
  );
}

export default App;
