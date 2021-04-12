import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { loadPosts } from './api/api';
import { Post } from './types';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(0);

  console.log(posts);
  
  useEffect(() => {
    loadPosts()
      .then(response => setPosts(response.data));
  }, [])

  useEffect(() => {
    switch (userId) {
      case 0:
      loadPosts()
        .then(response => setPosts(response.data));
        return;
      default:
      loadPosts()
        .then(posts => setPosts(posts.data.filter(( post: Post ) => post.userId === userId)));
    }

    setSelectedPostId(0);
  }, [userId]);

  const handleUserSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value)
  }

  return (
    <div className="App">
      <header className="App__header">
        Select a user: &nbsp;
        <select
          value={userId}
          className="App__user-selector"
          onChange={handleUserSelect}
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
      </header>
      <main className="App__main">
        <div className="App__sidebar">
          {posts.length && 
          <PostsList
            onCommentSelect={setSelectedPostId}
            selectedPostId={selectedPostId}
            posts={posts}
          />}
        </div>

        <div className="App__content">
          {selectedPostId && (
            <PostDetails
              selectedPostId={selectedPostId}
              posts={posts}
            />
          )}
        </div>
      </main>
    </div>
  )
}

export default App;
