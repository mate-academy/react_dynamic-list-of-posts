import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { Post } from './types/Post';
import { getPostDetails, getUserPosts } from './api/posts';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [userId, setUserId] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState<number>(0);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    getUserPosts(userId).then(response => {
      if ('Error' in response) {
        console.warn(response.Error); // eslint-disable-line
      } else {
        setPosts(response);
      }
    });
  }, [userId]);

  useEffect(() => {
    getPostDetails(selectedPostId).then(response => {
      if ('Error' in response) {
        console.warn(response.Error); // eslint-disable-line
      } else {
        setSelectedPost(response);
      }
    });
  }, [selectedPostId]);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={userId}
            onChange={({ target }) => setUserId(+target.value)}
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
            onSelectedPost={setSelectedPostId}
          />
        </div>

        {selectedPostId !== 0 && selectedPost && (
          <div className="App__content">
            <PostDetails post={selectedPost} postId={selectedPostId} />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
