import React, { useState } from 'react';

import './App.css';
import _ from 'lodash';

import PostList from './components/PostList';

const BaseUrl = 'https://jsonplaceholder.typicode.com/';

function getPostsWithUsersAndComment(posts, users, comments) {
  return posts.map(item => ({
    ...item,
    user: users.find(elem => item.userId === elem.id),
    commentsArray: comments.filter(elem => elem.postId === item.id),
  }));
}

const App = () => {
  const [loading, setLoading] = useState(false);
  const [arr, setArr] = useState([]);
  const [title, setTitle] = useState('');

  const setQueryWithDebounce = _.debounce((query) => {
    setTitle(query);
  }, 1000);

  const loadPosts = async() => {
    setLoading(true);
    setArr(await getPostsList());
  };

  const getPostsList = async() => {
    const [posts, users, comments] = await Promise.all([
      getDataFromServer('posts'),
      getDataFromServer('users'),
      getDataFromServer('comments'),
    ]);

    return getPostsWithUsersAndComment(posts, users, comments);
  };

  const getDataFromServer = async(url) => {
    const response = await fetch(`${BaseUrl}${url}`);

    return response.json();
  };

  const findPost = () => arr.filter(item => (
    (item.title + item.body).includes(title)));

  return (
    <>
      <div className="App">
        <h1>Dunamic list of posts</h1>
        {!loading
          && <button type="button" onClick={loadPosts}>Load</button>
        }
        {loading && !arr.length
          ? 'loading...' : ''}
        {loading && arr.length
          ? (
            <input onChange={event => (
              setQueryWithDebounce(event.target.value))}
            />
          )
          : ''}
        {arr.length && loading
          ? <PostList posts={findPost()} /> : ''
        }
      </div>
    </>
  );
};

export default App;
