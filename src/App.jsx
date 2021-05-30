import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';

import { getPostDetails, getPosts } from './api/posts';
import { removeComment, getPostComments } from './api/comments';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [selectUser, setUser] = useState(0);
  const [selectPost, setPost] = useState(0);
  const [details, setDet] = useState(false);
  const [comments, setComents] = useState([]);

  useEffect(() => {
    getPosts()
      .then(postsFromServer => setPosts(postsFromServer));
  }, []);

  useEffect(() => {
    getPostDetails(selectPost)
      .then(setDet);
  }, [selectPost]);

  useEffect(() => {
    getPostComments(selectPost)
      .then(setComents);
  }, [selectPost]);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={selectUser}
            onChange={e => setUser(+e.target.value)}
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
            setPost={setPost}
            selectUser={selectUser}
          />
        </div>

        <div className="App__content">
          {(selectPost > 0 && details) && (
          <PostDetails
            postId={selectPost}
            remove={removeComment}
            comments={comments}
          />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
