import React, { useState } from 'react';
import './App.css';

import { postsFromServer } from './Components/PostsFromServer';
import { usersFromServer } from './Components/UsersFromServer';
import { commentsFromServer } from './Components/CommentsFromServer';
import { delayTime } from './Components/Function';
import PostList from './Components/PostList';

const App = () => {
  const [typicalPosts, setTypicalPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isLoad, setLoad] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  let data;

  const loadData = async() => {
    setLoading(true);

    try {
      const [postData, userData, commentData] = await Promise.all([
        postsFromServer(),
        usersFromServer(),
        commentsFromServer(),
      ]);

      data = postData.map(
        post => ({
          ...post,
          user: userData.find(
            user => post.userId === user.id
          ),
          comments: commentData.filter(
            comment => post.id === comment.postId
          ),
        })
      );

      setTypicalPosts(data);
      setPosts(data);
      setLoading(false);
      setLoad(true);
    } catch (e) {
      setLoading(false);
    }
  };

  const searchWithDelayTime = delayTime(value => setPosts(
    typicalPosts.filter(
      ({ title, body }) => (title + body).toLowerCase().includes(value)
    )
  ), 500);

  const searchPosts = ({ target }) => {
    const value = target.value.toLowerCase().slice(0, 37);

    setSearchValue(value);
    searchWithDelayTime(value);
  };

  return (
    <div className="App">
      <h1>Dynamic list of posts</h1>
      {isLoad ? (
        <>
          <input
            type="search"
            placeholder="Search"
            onChange={searchPosts}
            value={searchValue}
          />

          <PostList
            posts={posts}
            searchResultValue={searchValue}
          />
        </>
      ) : (
        <button
          type="button"
          onClick={loadData}
          disabled={isLoading}
        >
          {isLoading ? 'Load...' : 'Load'}
        </button>
      )}
    </div>
  );
};

export default App;
