import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUserPosts2, getUserPosts } from './api/posts';
// import { BASE_URL } from './api/api';
import { request } from './api/api';

const getPosts = () => request('/posts');

getUserPosts2();

function App() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const requestedPosts = await getUserPosts();

      if (Number(selectedUser) === 0) {
        setPosts(requestedPosts.data);
      } else {
        const filteredPosts = requestedPosts.data.filter(
          post => (post.uerId === Number(selectedUser)),
        );

        setPosts(filteredPosts);
      }
    }

    getPosts()
      .then((data) => {
        // eslint-disable-next-line no-console
        console.log(data);
      });

    getPosts();
    fetchData();
  }, [selectedUser]);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={event => setSelectedUser(event.target.value)}
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
            selectedPostId={selectedPostId}
            posts={posts}
            setSelectedPostId={setSelectedPostId}
          />
        </div>

        <div className="App__content">
          <PostDetails />
        </div>
      </main>
    </div>
  );
}

export default App;
