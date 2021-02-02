import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getAllPosts, getPostDetails, getUserPosts } from './api/posts';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [isPostsLoadingFailed, setPostsLoadingFailed] = useState(false);
  const [activeUserId, setActiveUser] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState();
  const [post, setPost] = useState();
  const [postLoadingFailed, setPostLoadingFailed] = useState(false);

  async function fetchPosts(userId) {
    try {
      if (userId) {
        await getUserPosts(userId).then((postsFromServer) => {
          setPosts(postsFromServer);
        });
      } else {
        await getAllPosts().then((postsFromServer) => {
          setPosts(postsFromServer);
        });
      }
    } catch (error) {
      setPostsLoadingFailed(true);
    }
  }

  async function fetchPost() {
    try {
      await getPostDetails(selectedPostId).then((postFromServer) => {
        setPost(postFromServer.data);
      });
    } catch (error) {
      setPostLoadingFailed(true);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    fetchPosts(activeUserId);
  }, [activeUserId]);

  useEffect(() => {
    fetchPost();
  }, [selectedPostId]);

  const isPostSelected = postId => (postId === selectedPostId);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={activeUserId}
            onChange={({ target }) => setActiveUser(+target.value)}
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
          {!isPostsLoadingFailed
            ? (
              <PostsList
                posts={posts}
                isPostSelected={isPostSelected}
                onPostSelect={setSelectedPostId}
              />
            )
            : (<div>Posts loading failed</div>)
          }
        </div>

        <div className="App__content">
          {selectedPostId && (
            <PostDetails
              {...post}
              postLoadingFailed={postLoadingFailed}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
