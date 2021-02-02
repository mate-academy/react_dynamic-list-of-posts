import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getAllPosts, getUserPosts } from './api/posts';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [userValue, setUserValue] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(0);

  const getPostId = (postId) => {
    (selectedPostId !== postId)
      ? setSelectedPostId(postId)
      : setSelectedPostId(0);
  };

  useEffect(() => {
    const fetchData = async() => {
      let request;

      (userValue)
        ? request = await getUserPosts(userValue)
        : request = await getAllPosts();

      setPosts(request.data);
    };

    fetchData();
  }, [userValue]);

  const onSelectChange = (e) => {
    setUserValue(Number(e.target.value));
    setSelectedPostId(0);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select className="App__user-selector" onChange={onSelectChange}>
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
            posts={posts}
            getPostId={getPostId}
            selectedPostId={selectedPostId}
          />
        </div>

        <div className="App__content">
          <PostDetails postId={selectedPostId} />
        </div>
      </main>
    </div>
  );
};

export default App;
