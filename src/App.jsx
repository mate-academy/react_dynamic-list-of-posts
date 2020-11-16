import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/Posts/PostsList';
import { PostDetails } from './components/Posts/PostDetails';
import { getUserPosts } from './api/posts';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(0);

  const changePostId = (postId) => {
    setSelectedPostId(postId);
  };

  const changeUserId = (event) => {
    const { value } = event.target;

    setUserId(+value);
  };

  useEffect(() => {
    getUserPosts(userId)
      .then((userPostsFromServer) => {
        userId !== 0 ? setPosts(userPostsFromServer
          .filter(post => post.userId === userId))
          : setPosts(userPostsFromServer);
      });
  }, [userId]);

  return (

    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={userId}
            onChange={changeUserId}
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
            posts={posts}
            changePostId={changePostId}
          />
        </div>
        <div className="App__content">
          {selectedPostId ? (
            <PostDetails
              postId={selectedPostId}
            />
          ) : (<div>Please, choose a post</div>)}
        </div>
      </main>
    </div>
  );
};

export default App;
