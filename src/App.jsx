/* eslint-disable */
import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import api from './api/api';
import { getPosts } from './api/api';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [postId, setPostId] = useState(0);
  const [selectOption, setSelectOption] = useState('0');
  const [filtered, setFiltered] = useState([]);

  // #1
  useEffect(() => {
    getPosts()
      .then(posts => {
        setPosts(posts);
      });
  }, []);

  // #2
  // useEffect(() => {
  //  const posts = async() => {
  //    const response = await getPosts()
  //    setPosts(response.data);
  //  }
  //
  //  posts();
  // }, []);

  // #3 (IIFE)
  // useEffect(() => {
  //   (async() => {
  //     const response = await getPosts()
  //     setPosts(response.data);
  //   })()
  //
  // }, []);

  useEffect(() => {
    // console.log('123');
    const filteredPosts = posts.filter(post => (
      post.userId === Number(selectOption)
    ));
    setFiltered(filteredPosts);

  }, [selectOption]);

  const onSelect = (e) => {
    setSelectOption(e.target.value);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            value={selectOption}
            onChange={onSelect}
            className="App__user-selector"
          >
            <option value="0">All users</option>
            <option value="1">Leanne Graham</option>
            <option value="2">Ervin Howell</option>
            <option value="3">Clementine Bauch</option>
            <option value="4">Patricia Lebsack</option>
            <option value="5">Chelsey Dietrich</option>
            <option value="6">Mrs. Dennis Schulist</option>
            <option value="7">Kurtis Weissnat</option>
            <option value="8">Nicholas Runolfsdottir V</option>
            <option value="9">Glenna Reichert</option>
            <option value="10">Leanne Graham</option>
          </select>

        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">

          <PostsList
            posts={filtered.length > 0 ? filtered : posts}
            selectedPostId={postId}
            selectPost={(postId) => {
              setPostId(postId);
              console.log('SelectUser');
            }}
          />
        </div>

        {postId !== 0 && (
          <div className="App__content">
            <PostDetails
              post={posts.find(post => post.id === postId)}
              // postId={postId}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
