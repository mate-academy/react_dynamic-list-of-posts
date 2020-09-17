import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUserPosts } from './api/posts';


const App = () => {
  const [posts, updatePosts] = useState([]);
  const [selectedUser, updateUser] = useState(0);
  const [selectedPostId, setPost] = useState(0);
  const [activeButton, toggleButton] = useState(false);

  useEffect(()=>{
    const fetchData = async() => {
      const result = await getUserPosts(selectedUser);

      updatePosts(result);
    };

    fetchData();
  }, [selectedUser]);

  function consolium(selectObject) {
    console.log(selectObject);
  }

  const selectPost = (postID) => (setPost(postID));

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            onChange={event => updateUser(+event.target.value)}
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
            posts={posts}
            selectPost={selectPost}
            activeButton={activeButton}
            toggleButton={toggleButton}
            selectedPostId={selectedPostId}
          />
        </div>

        <div className="App__content">
          <PostDetails
            posts={posts}
            selectedPostId={selectedPostId}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
