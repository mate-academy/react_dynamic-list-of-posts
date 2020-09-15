import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getAllPosts, getPostDetails, getUserPosts } from './api/posts';
import { getPostComments } from './api/comments';

const App = () => {
  const [postsFromServer, setPosts] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(0);
  const [selectedPost, setSelectedPost] = useState({});
  const [commentsFromServer, setComments] = useState([]);

  useEffect(() => {
    (async() => {
      setPosts(await getAllPosts());
    })();
  }, []);

  useEffect(() => {
    (async() => {
      if (+selectedUserId === 0) {
        setPosts(await getAllPosts());
      } else {
        setPosts(await getUserPosts(+selectedUserId));
      }
    })();
  }, [selectedUserId]);

  const selectPost = async(postId) => {
    setSelectedPostId(postId);
    setSelectedPost(await getPostDetails(postId));
    setComments(await getPostComments(postId));
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            value={selectedUserId}
            className="App__user-selector"
            onChange={event => setSelectedUserId(event.target.value)}
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
            posts={postsFromServer}
            selectedPostId={selectedPostId}
            selectPost={selectPost}
            setSelectedPostId={setSelectedPostId}
          />
        </div>

        <div className="App__content">
          {selectedPostId > 0 && (
            <PostDetails
              post={selectedPost}
              comments={commentsFromServer}
              selectPost={selectPost}
            />
          )}
        </div>

      </main>
    </div>
  );
};

export default App;
