import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getPosts } from './api/api';
import { getUserPosts } from './api/posts';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedUser, setSelectedUser] = useState(0);
  const [selectedPostId, setselectedPostId] = useState(0);

  useEffect(() => {
    getPosts()
      .then(allPosts => {
        setPosts(allPosts);
      });
  }, []);

  useEffect(() => {
    if (selectedUser === 0) {
      getPosts()
        .then(allPosts => {
          setPosts(allPosts);
        });
    } else {
      getUserPosts(selectedUser)
        .then(userPosts => {
          setPosts(userPosts);
        });
    }
  }, [selectedUser]);

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(+event.target.value);
  };

  const handleSelectedPostId = (postId: number) => {
    if (postId === selectedPostId) {
      setselectedPostId(0);
    } else {
      setselectedPostId(postId);
    }
  };

  return (
    <div className="App">
      <header className="App__header">
        <label htmlFor="selectUser">
          Select a user: &nbsp;
          <select
            className="App__user-selector"
            id="selectUser"
            name="selectedUser"
            value={selectedUser}
            onChange={handleUserChange}
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
            selectedPostId={selectedPostId}
            onSelectedPostId={handleSelectedPostId}
          />
        </div>

        <div className="App__content">
          { selectedPostId
            ? (
              <PostDetails
                selectedPostId={selectedPostId}
              />
            )
            : 'Post not selected'}
        </div>
      </main>
    </div>
  );
};

export default App;
