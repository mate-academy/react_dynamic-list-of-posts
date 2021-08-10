import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUserPosts, getAllPosts } from './api/posts';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedPostId, setselectedPostId] = useState('');

  const handleChange = (event) => {
    setUser(event.target.value);
  };

  useEffect(() => {
    if (+user !== 0) {
      getUserPosts(+user)
        .then(post => setPosts(post.data));

      return;
    }

    getAllPosts()
      .then(response => response.data)
      .then((postsFromServer) => {
        setPosts(postsFromServer);
      });
  }, [user]);

  const showDetails = (postId) => {
    setselectedPostId(postId);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;
          <select
            value={user}
            onChange={handleChange}
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
            setPosts={setPosts}
            showDetails={showDetails}
          />
        </div>

        <div className="App__content">
          {selectedPostId === '' ? 'Choose a post to see details' : ''}
          {selectedPostId && <PostDetails selectedPost={selectedPostId} />}
        </div>
      </main>
    </div>
  );
};

export default App;
