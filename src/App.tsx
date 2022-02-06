import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUserPosts } from './api/posts';
import { Loader } from './components/Loader';

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(0);
  const [usersPosts, setUserPosts] = useState<Post[]>([]);
  const [arePostsLoading, toggleArePostsLoading] = useState(false);

  const handleSelectedPost = (postId: number) => {
    if (postId === selectedPostId) {
      setSelectedPostId(0);
    } else {
      setSelectedPostId(postId);
    }
  };

  const handleUserSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.currentTarget;

    setSelectedUserId(+value);
    setSelectedPostId(0);
  };

  useEffect(() => {
    (async function fetchUserPosts() {
      if (selectedUserId !== 0) {
        toggleArePostsLoading(true);
        const userPostsFromServer = await getUserPosts(selectedUserId);

        setUserPosts(userPostsFromServer);
        toggleArePostsLoading(false);
      }
    }());
  }, [selectedUserId]);

  return (
    <div className="App">
      <header className="App__header">
        <label htmlFor="selectUser">
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            id="selectUser"
            value={selectedUserId}
            onChange={handleUserSelection}
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
          {selectedUserId !== 0
            ? (
              <PostsList
                posts={usersPosts}
                postId={selectedPostId}
                handleSelectedPost={handleSelectedPost}
              />
            )
            : (
              <h4>No user selected</h4>
            )}
          {arePostsLoading && <Loader />}
        </div>

        <div className="App__content">
          {selectedPostId !== 0
            ? <PostDetails postId={selectedPostId} />
            : <h3>Choose the post to see comments</h3>}
        </div>
      </main>
    </div>
  );
};

export default App;
