import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getAllPosts, getUserPosts } from './api/posts';

const App: React.FC = () => {
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(0);

  useEffect(() => {
    const getPosts = async () => {
      if (userId === 0) {
        const allPosts = await getAllPosts();

        setPosts(allPosts);
      } else {
        const userPosts = await getUserPosts(userId);

        setPosts(userPosts);
      }
    };

    getPosts();
  }, [userId]);

  const changePostDetailVisability = (postId: number) => {
    setSelectedPostId(postId);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));
  };

  return (
    <div className="App">
      <header className="App__header">
        <label htmlFor="selecteUser">
          Select a user: &nbsp;

          <select
            id="selecteUser"
            className="App__user-selector"
            value={userId}
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
            seePostDetails={changePostDetailVisability}
            selectedPostId={selectedPostId}
          />
        </div>

        <div className="App__content">
          {selectedPostId > 0 && (<PostDetails postId={selectedPostId} />)}
        </div>
      </main>
    </div>
  );
};

export default App;
